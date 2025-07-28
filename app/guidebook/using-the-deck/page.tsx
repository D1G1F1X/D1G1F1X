import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Using the Deck",
  description: "How to use the NUMO Oracle Deck for readings and personal growth",
}

export default function UsingTheDeckPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Using the </span>
          <span className="text-purple-400">NUMO Oracle Deck</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Learn how to conduct readings and interpret cards for insight and guidance
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/card-spreads">Card Spreads</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <p className="lead text-xl">
              The NUMO Oracle Deck offers profound insights through its combination of numerology, astrology, and
              elemental influences. Each reading is an opportunity to connect with the energies that guide your path,
              providing clarity, wisdom, and direction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="relative h-64 w-full">
                <Image src="/glowing-celtic-oracle.png" alt="Oracle Reading" fill className="object-contain" />
              </div>
              <div>
                <h3>The Art of Reading</h3>
                <p>
                  Reading with the NUMO Oracle Deck is both an art and a science. It combines the structured meanings of
                  numerology and astrology with intuitive insights, creating a multi-dimensional approach to divination.
                  Whether you are seeking answers to a specific question or exploring general guidance, the NUMO Oracle
                  Deck can help you uncover hidden truths and navigate life's challenges.
                </p>
              </div>
            </div>

            <h2>Incorporating User Numerology Data into a Reading</h2>
            <p>
              One of the most unique aspects of the NUMO Oracle Deck is its ability to integrate personal numerology
              data to deepen the insights of any reading. By incorporating birthdates, names, and even address changes,
              you can unlock hidden layers of meaning in your reading and tailor it to the specific energies influencing
              your life.
            </p>

            <h3>Birthdates</h3>
            <p>
              The numerology of your birthdate offers profound insights into your life path, personal challenges, and
              strengths. You can calculate your Life Path Number by adding the digits of your full birthdate and
              reducing them to a single digit (unless it's a Master Number like 11, 22, or 33).
            </p>
            <p>
              <strong>Example:</strong> If your birthdate is July 4, 1990, you would calculate as follows: 7+4+1+9+9+0=
              30, and 3+0=3. This makes your Life Path Number a 3, which is associated with creativity, communication,
              and self-expression.
            </p>

            <h3>Names</h3>
            <p>
              Every name carries a specific numerical vibration. By assigning numerical values to the letters of your
              name (using numerology charts), you can gain insights into your personality and the energies surrounding
              you. Your Expression Number (based on your full name) reveals your strengths and talents, while your Soul
              Urge Number (based on vowels) highlights your inner desires.
            </p>

            <h3>Address Changes</h3>
            <p>
              Believe it or not, your physical address can also carry numerical vibrations. The numbers in your address
              can influence your experiences, opportunities, and challenges in your home or work environment. For
              example, an address that reduces to the number 5 might indicate frequent changes or a dynamic, energetic
              household, while a 4 might signify stability and structure.
            </p>

            <h2>Card Spreads in the NUMO Oracle Deck</h2>
            <p>
              The layout or "spread" you choose for your reading determines how the cards interact with each other and
              what messages are revealed. Below are several spreads designed to unlock different layers of insight:
            </p>

            <h3>1. The Single Card Spread</h3>
            <ul>
              <li>
                <strong>Purpose:</strong> Quick guidance for immediate decisions or daily reflection.
              </li>
              <li>
                <strong>How to Use:</strong> Shuffle the deck and draw one card, focusing on your specific question or
                concern. The card you draw provides a clear message related to your current situation.
              </li>
              <li>
                <strong>Interpretation:</strong> This card is a snapshot of the present moment, offering insight into
                your next steps. Use the guidebook to explore the card's numerological, astrological, and elemental
                meanings in relation to your situation.
              </li>
            </ul>

            <h3>2. The Three-Card Spread</h3>
            <ul>
              <li>
                <strong>Purpose:</strong> A balanced overview of past, present, and future influences.
              </li>
              <li>
                <strong>How to Use:</strong> Shuffle the deck and draw three cards. The first card represents the past,
                the second card represents the present, and the third card represents the future.
              </li>
              <li>
                <strong>Interpretation:</strong> This spread offers a holistic perspective on the question at hand. Look
                at how the energies of each card influence one another and how past actions have led to the present
                situation. The third card offers insight into possible future outcomes based on your current path.
              </li>
            </ul>

            <h3>3. The Challenge and Opportunity Spread</h3>
            <ul>
              <li>
                <strong>Purpose:</strong> To identify the obstacles and opportunities that lie ahead.
              </li>
              <li>
                <strong>How to Use:</strong> Shuffle the deck and draw two cards. The first card represents a challenge
                or obstacle, and the second card represents an opportunity.
              </li>
              <li>
                <strong>Interpretation:</strong> The first card reveals the nature of the challenge you're facing, while
                the second card highlights the opportunity that arises from overcoming that challenge. Consider how the
                elements and astrological influences of each card interact—are there conflicting or complementary
                energies? This spread encourages you to confront difficulties and recognize hidden opportunities.
              </li>
            </ul>

            <h2>Real-World Example: One-Card Spread</h2>
            <p>
              <strong>Scenario:</strong> Mark is seeking personal growth in his relationships. He provides his
              birthdate, which is November 3, 1992, and his full name is Mark Andrew Johnson.
            </p>
            <p>
              <strong>Life Path Number Calculation:</strong> 1(November)+3+1+9+9+2=25 → 2+5=7. Mark's Life Path Number
              is 7, which symbolizes introspection, wisdom, and spiritual growth.
            </p>
            <p>
              <strong>Destiny Number Calculation:</strong> Mark Andrew Johnson:
            </p>
            <ul>
              <li>M(4)+A(1)+R(9)+K(2)=16 → 1+6=7</li>
              <li>A(1)+N(5)+D(4)+R(9)+E(5)+W(5)=29 → 2+9=11 → 1+1=2</li>
              <li>J(1)+O(6)+H(8)+N(5)+S(1)+O(6)+N(5)=32 → 3+2=5</li>
            </ul>
            <p>
              Destiny Number=7+2+5=14 → 1+4=5. Mark's Destiny Number is 5, which signifies adaptability, freedom, and a
              desire for adventure.
            </p>
            <p>
              <strong>Card Pull:</strong> Mark decides to do a simple One-Card Spread to gain insight into what he
              should focus on for emotional growth. He shuffles the deck, focusing on his relationships, and pulls the
              following card:
            </p>
            <ul>
              <li>
                <strong>2 of Cauldron (Earth):</strong> This card represents balance, harmony, and emotional connection,
                but with an emphasis on grounding and stability since its element is Earth. The number 2 signifies the
                need for cooperation and balance in relationships. The Cauldron emphasizes emotional well-being, but the
                Earth element here suggests that Mark should focus on grounding his emotions and creating solid
                foundations in his relationships.
              </li>
            </ul>
            <p>
              <strong>Interpreting the Spread:</strong>
            </p>
            <ul>
              <li>
                <strong>Numerology:</strong> Mark's introspective and spiritual nature (Life Path 7) complements the 2
                of Cauldron (Earth), indicating that he can use his introspection to build emotionally grounded
                relationships. His Destiny Number 5 indicates a desire for freedom and exploration, which could make it
                challenging for him to maintain stable relationships. However, the Earth element suggests that Mark
                should focus on creating balance between his need for adventure and the emotional security of those
                around him.
              </li>
              <li>
                <strong>Overall Reading:</strong> The 2 of Cauldron (Earth) suggests that Mark's personal growth will
                come from emotional balance and cooperation, but with an emphasis on stability. The Earth element urges
                him to focus on creating secure, grounded relationships while still balancing his need for personal
                freedom as indicated by his Destiny Number 5.
              </li>
            </ul>

            <h2>Trusting Your Intuition</h2>
            <p>
              While the NUMO Oracle Deck provides a structured framework for interpretation, it's important to trust
              your intuition during readings. The cards are a tool for accessing deeper wisdom, but your inner guidance
              is equally valuable. Pay attention to your initial impressions, feelings, and insights when you draw a
              card, as these intuitive responses often contain important messages.
            </p>
            <p>
              Remember that the NUMO Oracle Deck is a guide, not a definitive answer. It offers insights and
              perspectives, but ultimately, you have the power to shape your own destiny. Use the deck as a tool for
              reflection, growth, and self-discovery, allowing it to illuminate your path but not dictate it.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/card-spreads">Card Spreads</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
