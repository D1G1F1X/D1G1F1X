import sqlite3
from datetime import datetime, timedelta

import requests

DB_NAME = "congress_trades.db"
DATA_URL = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"


def setup_database() -> None:
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS trades (
                id TEXT PRIMARY KEY,
                representative TEXT,
                ticker TEXT,
                transaction_date TEXT,
                disclosure_date TEXT,
                amount TEXT,
                asset_description TEXT,
                type TEXT
            )
            """
        )


def fetch_and_store_data() -> None:
    print(f"Fetching data from {DATA_URL}...")
    response = requests.get(DATA_URL, timeout=30)
    response.raise_for_status()
    data = response.json()

    inserted_count = 0
    with sqlite3.connect(DB_NAME) as conn:
        for trade in data:
            unique_id = (
                f"{trade.get('ptr_link', '')}_{trade.get('ticker', '')}_{trade.get('transaction_date', '')}"
            )

            try:
                conn.execute(
                    """
                    INSERT INTO trades (id, representative, ticker, transaction_date, disclosure_date, amount, asset_description, type)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        unique_id,
                        trade.get("representative"),
                        trade.get("ticker"),
                        trade.get("transaction_date"),
                        trade.get("disclosure_date"),
                        trade.get("amount"),
                        trade.get("asset_description"),
                        trade.get("type"),
                    ),
                )
                inserted_count += 1
            except sqlite3.IntegrityError:
                pass
    print(f"Inserted {inserted_count} new trades.")


def analyze_actionable_trades(max_lag_days: int = 10, recent_days: int = 5) -> None:
    print("\n--- Actionable Trades Report ---")
    today = datetime.now()
    recent_cutoff_date = today - timedelta(days=recent_days)

    with sqlite3.connect(DB_NAME) as conn:
        query = """
            SELECT representative, ticker, transaction_date, disclosure_date, amount, type
            FROM trades
            WHERE ticker != '--' AND ticker IS NOT NULL AND ticker != 'N/A'
        """
        cursor = conn.execute(query)
        rows = cursor.fetchall()

    actionable_count = 0
    results = []

    for row in rows:
        rep, ticker, t_date, d_date, amount, t_type = row

        try:
            t_obj = datetime.strptime(t_date, "%Y-%m-%d")
            d_obj = datetime.strptime(d_date, "%m/%d/%Y")
        except (ValueError, TypeError):
            continue

        if d_obj >= recent_cutoff_date:
            lag = (d_obj - t_obj).days
            if 0 <= lag <= max_lag_days:
                results.append(
                    {
                        "disclosure": d_obj,
                        "string": f"[{d_date}] {rep} | {t_type} | {ticker} | {amount} | Lag: {lag} days",
                    }
                )

    results.sort(key=lambda x: x["disclosure"], reverse=True)

    for res in results:
        print(res["string"])
        actionable_count += 1

    if actionable_count == 0:
        print(
            f"No actionable trades found (Disclosure within last {recent_days} days, max {max_lag_days} day reporting lag)."
        )


if __name__ == "__main__":
    setup_database()
    fetch_and_store_data()
    analyze_actionable_trades()
