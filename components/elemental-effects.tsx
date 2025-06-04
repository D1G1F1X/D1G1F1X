"use client"

import { useEffect } from "react"

export default function ElementalEffects() {
  useEffect(() => {
    // Add CSS for elemental effects
    const style = document.createElement("style")
    style.textContent = `
      /* Base card styles */
      .card-fire, .card-water, .card-earth, .card-air, .card-spirit {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      /* Fire effect */
      .card-fire::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 100, 50, 0), rgba(255, 100, 50, 0));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      
      .card-fire:hover::before {
        opacity: 0.15;
        background: radial-gradient(circle at center, rgba(255, 100, 50, 0.3), rgba(255, 100, 50, 0));
        animation: fireFlicker 1s infinite alternate;
      }
      
      @keyframes fireFlicker {
        0% { opacity: 0.1; }
        100% { opacity: 0.2; }
      }
      
      /* Water effect */
      .card-water::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(50, 150, 255, 0), rgba(50, 150, 255, 0));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      
      .card-water:hover::before {
        opacity: 0.15;
        background: radial-gradient(circle at center, rgba(50, 150, 255, 0.3), rgba(50, 150, 255, 0));
        animation: waterRipple 2s infinite;
      }
      
      @keyframes waterRipple {
        0% { transform: scale(0.95); opacity: 0.1; }
        50% { transform: scale(1.05); opacity: 0.2; }
        100% { transform: scale(0.95); opacity: 0.1; }
      }
      
      /* Earth effect */
      .card-earth::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(75, 180, 75, 0), rgba(75, 180, 75, 0));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      
      .card-earth:hover::before {
        opacity: 0.15;
        background: radial-gradient(circle at center, rgba(75, 180, 75, 0.3), rgba(75, 180, 75, 0));
        animation: earthGrow 2s infinite alternate;
      }
      
      @keyframes earthGrow {
        0% { transform: scale(0.98); opacity: 0.1; }
        100% { transform: scale(1.02); opacity: 0.2; }
      }
      
      /* Air effect */
      .card-air::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 255, 150, 0), rgba(255, 255, 150, 0));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      
      .card-air:hover::before {
        opacity: 0.15;
        background: radial-gradient(circle at center, rgba(255, 255, 150, 0.3), rgba(255, 255, 150, 0));
        animation: airGlow 3s infinite;
      }
      
      @keyframes airGlow {
        0% { transform: scale(0.98); opacity: 0.1; }
        50% { transform: scale(1.02); opacity: 0.2; }
        100% { transform: scale(0.98); opacity: 0.1; }
      }
      
      /* Spirit effect */
      .card-spirit::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      
      .card-spirit:hover::before {
        opacity: 0.15;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
        animation: spiritRise 2s infinite;
      }
      
      @keyframes spiritRise {
        0% { transform: translateY(0); opacity: 0.1; }
        50% { transform: translateY(-5px); opacity: 0.2; }
        100% { transform: translateY(0); opacity: 0.1; }
      }
    `
    document.head.appendChild(style)

    // Add elemental classes to cards based on their content
    const addElementalClasses = () => {
      // Find all cards
      const cards = document.querySelectorAll(".card")

      cards.forEach((card) => {
        // Check card content to determine element
        const cardText = card.textContent?.toLowerCase() || ""
        const cardImage = card.querySelector("img")?.src || ""

        // Determine element based on content or image src
        if (cardText.includes("fire") || cardImage.includes("fire")) {
          card.classList.add("card-fire")
        } else if (cardText.includes("water") || cardImage.includes("water")) {
          card.classList.add("card-water")
        } else if (cardText.includes("earth") || cardImage.includes("earth")) {
          card.classList.add("card-earth")
        } else if (cardText.includes("air") || cardImage.includes("air")) {
          card.classList.add("card-air")
        } else if (cardText.includes("spirit") || cardImage.includes("spirit")) {
          card.classList.add("card-spirit")
        } else {
          // Default to spirit for cards without clear element
          card.classList.add("card-spirit")
        }
      })
    }

    // Run initially and whenever DOM changes
    addElementalClasses()

    // Use MutationObserver to detect new cards
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          addElementalClasses()
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.head.removeChild(style)
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything visible
}
