"use client"

import { useState } from "react"

// Card interface
export interface LibraryCard {
  id: string
  name: string
  image: string
  element: string
  type: string
  number: number
  meaning: string
  reversedMeaning: string
  keywords: string[]
  description: string
  elementalAffinity: string
  numerologicalSignificance: string
}

// Card data
export const libraryCards: LibraryCard[] = [
  // Cauldron Series I
  {
    id: "cauldron-earth-1",
    name: "Cauldron of Earth I",
    image: "/cards/01cauldron-earth.jpg",
    element: "Earth",
    type: "Cauldron",
    number: 1,
    meaning:
      "New beginnings in material matters, foundation building, and stability. This card signals the start of a new phase in your physical world, whether related to finances, career, health, or home. It's a time to plant seeds and establish solid foundations.",
    reversedMeaning:
      "Missed opportunities, delays in material progress, or instability. You may be struggling to get a new project off the ground or feeling uncertain about your material security. Reassess your foundation and make necessary adjustments.",
    keywords: ["beginnings", "foundation", "material", "stability", "growth"],
    description:
      "The Cauldron of Earth I represents the vessel of physical manifestation at its beginning stage. It symbolizes the fertile soil where ideas can take root and grow into tangible reality.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It grounds spiritual energy into physical form.",
    numerologicalSignificance:
      "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the material realm.",
  },
  {
    id: "cauldron-fire-1",
    name: "Cauldron of Fire I",
    image: "/cards/01cauldron-fire.jpg",
    element: "Fire",
    type: "Cauldron",
    number: 1,
    meaning:
      "The spark of passion, creative inspiration, and transformative energy. This card signals the beginning of a creative project, a new passion, or a spiritual awakening. It's a time to embrace your enthusiasm and allow your inner fire to guide you.",
    reversedMeaning:
      "Blocked creativity, dampened enthusiasm, or fear of change. You may be hesitant to embrace your passions or feeling that your creative spark is diminished. Look for ways to reignite your inner flame.",
    keywords: ["passion", "creativity", "inspiration", "transformation", "energy"],
    description:
      "The Cauldron of Fire I represents the vessel of transformation at its beginning stage. It symbolizes the initial spark that can grow into a transformative flame.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing energy that initiates change.",
    numerologicalSignificance:
      "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of passion and transformation.",
  },
  {
    id: "cauldron-air-1",
    name: "Cauldron of Air I",
    image: "/cards/01cauldron-air.jpg",
    element: "Air",
    type: "Cauldron",
    number: 1,
    meaning:
      "New ideas, mental clarity, and the beginning of communication. This card signals the start of intellectual pursuits, learning opportunities, or important conversations. It's a time to embrace new concepts and express your thoughts.",
    reversedMeaning:
      "Mental confusion, communication barriers, or scattered thoughts. You may be struggling to articulate your ideas or feeling overwhelmed by too many thoughts. Focus on clarity and simplicity.",
    keywords: ["ideas", "clarity", "communication", "intellect", "learning"],
    description:
      "The Cauldron of Air I represents the vessel of thought and communication at its beginning stage. It symbolizes the clear space where new ideas can form and take flight.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the breath of inspiration that brings new thoughts.",
    numerologicalSignificance:
      "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of thought and communication.",
  },
  {
    id: "cauldron-water-1",
    name: "Cauldron of Water I",
    image: "/cards/01cauldron-water.jpg",
    element: "Water",
    type: "Cauldron",
    number: 1,
    meaning:
      "New emotional beginnings, intuitive awakening, and the start of relationships. This card signals the beginning of an emotional journey, a new relationship, or the first stirrings of intuitive awareness. It's a time to open your heart and trust your feelings.",
    reversedMeaning:
      "Emotional hesitation, intuitive blocks, or fear of vulnerability. You may be reluctant to open yourself emotionally or doubting your intuitive impressions. Allow yourself to feel without judgment.",
    keywords: ["emotions", "intuition", "relationships", "feelings", "flow"],
    description:
      "The Cauldron of Water I represents the vessel of emotions and intuition at its beginning stage. It symbolizes the first drops that will eventually become a flowing stream of feeling and insight.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the first ripples of feeling that expand outward.",
    numerologicalSignificance:
      "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of emotions and intuition.",
  },
  {
    id: "cauldron-spirit-1",
    name: "Cauldron of Spirit I",
    image: "/cards/01cauldron-spirit.jpg",
    element: "Spirit",
    type: "Cauldron",
    number: 1,
    meaning:
      "Spiritual awakening, soul purpose, and divine connection. This card signals the beginning of a spiritual journey, a new understanding of your purpose, or the first connection with higher guidance. It's a time to embrace your spiritual nature.",
    reversedMeaning:
      "Spiritual doubt, disconnection from purpose, or resistance to divine guidance. You may be questioning your path or feeling separated from your spiritual essence. Trust that you are always connected, even when you can't feel it.",
    keywords: ["awakening", "purpose", "connection", "divinity", "essence"],
    description:
      "The Cauldron of Spirit I represents the vessel of spiritual connection at its beginning stage. It symbolizes the initial opening to divine energy and purpose.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the first awareness of your eternal nature.",
    numerologicalSignificance:
      "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of spiritual connection and purpose.",
  },

  // Cauldron Series X
  {
    id: "cauldron-water-10",
    name: "Cauldron of Water X",
    image: "/cards/10cauldron-water.jpg",
    element: "Water",
    type: "Cauldron",
    number: 10,
    meaning:
      "Emotional fulfillment, deep intuitive wisdom, and emotional completion. This card indicates a cycle of emotional growth has reached its culmination, bringing a sense of wholeness and deep satisfaction in relationships or spiritual connection.",
    reversedMeaning:
      "Emotional overwhelm, unresolved feelings, or disconnection from intuition. You may be experiencing emotional turbulence or feeling that something remains incomplete in your emotional life. Take time to process your feelings fully.",
    keywords: ["fulfillment", "intuition", "completion", "emotional wisdom", "flow"],
    description:
      "The Cauldron of Water X represents the vessel of emotions and intuition at its completion stage. It symbolizes the deep well of emotional wisdom that comes from completing an emotional journey.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing nature of feelings and psychic awareness.",
    numerologicalSignificance:
      "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new emotional cycle is about to begin.",
  },
  {
    id: "cauldron-fire-10",
    name: "Cauldron of Fire X",
    image: "/cards/10cauldron-fire.jpg",
    element: "Fire",
    type: "Cauldron",
    number: 10,
    meaning:
      "Creative fulfillment, passionate completion, and transformative achievement. This card indicates a cycle of creative or spiritual growth has reached its culmination, bringing a sense of accomplishment and the transformation of energy into its highest form.",
    reversedMeaning:
      "Creative burnout, passion that has cooled, or incomplete transformation. You may feel that a creative project or passionate pursuit has lost its spark before reaching completion. Consider what needs to be rekindled or released.",
    keywords: ["fulfillment", "passion", "completion", "transformation", "achievement"],
    description:
      "The Cauldron of Fire X represents the vessel of transformation at its completion stage. It symbolizes the alchemical process that has successfully transmuted base elements into gold.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying flame that has completed its work.",
    numerologicalSignificance:
      "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new creative or transformative cycle is about to begin.",
  },
  {
    id: "cauldron-earth-10",
    name: "Cauldron of Earth X",
    image: "/cards/10cauldron-earth.jpg",
    element: "Earth",
    type: "Cauldron",
    number: 10,
    meaning:
      "Material fulfillment, physical completion, and tangible achievement. This card indicates a cycle of material growth has reached its culmination, bringing a sense of abundance, security, and the manifestation of long-term goals.",
    reversedMeaning:
      "Material disappointment, incomplete manifestation, or physical depletion. You may feel that your material goals remain unfulfilled or that what you've achieved doesn't bring the satisfaction you expected. Reassess what true abundance means to you.",
    keywords: ["fulfillment", "abundance", "completion", "manifestation", "achievement"],
    description:
      "The Cauldron of Earth X represents the vessel of physical manifestation at its completion stage. It symbolizes the abundant harvest that comes from patient tending of the material realm.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the culmination of efforts in the physical world.",
    numerologicalSignificance:
      "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of material creation is about to begin.",
  },
  {
    id: "cauldron-air-10",
    name: "Cauldron of Air X",
    image: "/cards/10cauldron-air.jpg",
    element: "Air",
    type: "Cauldron",
    number: 10,
    meaning:
      "Mental fulfillment, intellectual completion, and communicative achievement. This card indicates a cycle of mental growth has reached its culmination, bringing clarity of thought, successful communication, and the mastery of ideas.",
    reversedMeaning:
      "Mental exhaustion, incomplete understanding, or communication failures. You may feel that your intellectual pursuits have led to confusion rather than clarity, or that important messages remain undelivered. Take time to integrate what you've learned.",
    keywords: ["fulfillment", "clarity", "completion", "communication", "understanding"],
    description:
      "The Cauldron of Air X represents the vessel of thought and communication at its completion stage. It symbolizes the clear understanding that comes from fully developing and expressing ideas.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the culmination of mental processes and exchanges.",
    numerologicalSignificance:
      "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of mental creation is about to begin.",
  },
  {
    id: "cauldron-spirit-10",
    name: "Cauldron of Spirit X",
    image: "/cards/10cauldron-spirit.jpg",
    element: "Spirit",
    type: "Cauldron",
    number: 10,
    meaning:
      "Spiritual fulfillment, divine completion, and soul achievement. This card indicates a cycle of spiritual growth has reached its culmination, bringing a profound connection with your higher self, a sense of divine purpose, and the integration of spiritual wisdom.",
    reversedMeaning:
      "Spiritual disillusionment, incomplete awakening, or divine disconnection. You may feel that your spiritual journey has stalled or that the connection you seek remains elusive. Remember that spiritual growth often includes periods of apparent darkness.",
    keywords: ["fulfillment", "divinity", "completion", "integration", "wholeness"],
    description:
      "The Cauldron of Spirit X represents the vessel of spiritual connection at its completion stage. It symbolizes the divine union that comes from fully embracing your spiritual nature.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the culmination of spiritual awakening.",
    numerologicalSignificance:
      "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of spiritual growth is about to begin.",
  },

  // Sword Series 25
  {
    id: "sword-earth-25",
    name: "Sword of Earth",
    image: "/cards/25sword-earth.jpg",
    element: "Earth",
    type: "Sword",
    number: 25,
    meaning:
      "Practical truth, material clarity, and grounded decisions. This card indicates a time when your practical wisdom allows you to cut through confusion with stability and make decisions that establish or protect your material foundation.",
    reversedMeaning:
      "Impractical thinking, material confusion, or indecision about practical matters. You may be struggling to see the practical truth of a situation or hesitating to make necessary decisions about material concerns.",
    keywords: ["practicality", "clarity", "decision", "stability", "truth"],
    description:
      "The Sword of Earth represents the blade of practical truth that cuts through illusion. It symbolizes the power of decisive action grounded in material wisdom and practical understanding.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings clarity to material concerns.",
    numerologicalSignificance:
      "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through practical investigation.",
  },
  {
    id: "sword-fire-25",
    name: "Sword of Fire",
    image: "/cards/25sword-fire.jpg",
    element: "Fire",
    type: "Sword",
    number: 25,
    meaning:
      "Passionate truth, creative clarity, and transformative decisions. This card indicates a time when your passion and clarity align, allowing you to cut through confusion with the fire of inspiration and make decisions that transform your path.",
    reversedMeaning:
      "Destructive impulses, creative blocks, or passion without direction. You may be experiencing a disconnect between your truth and your passion, leading to impulsive actions or creative frustration.",
    keywords: ["passion", "clarity", "transformation", "decision", "action"],
    description:
      "The Sword of Fire represents the blade of passionate truth that cuts through illusion. It symbolizes the power of decisive action fueled by creative fire and transformative energy.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying flame that brings clarity through transformation.",
    numerologicalSignificance:
      "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through passionate exploration.",
  },
  {
    id: "sword-water-25",
    name: "Sword of Water",
    image: "/cards/25sword-water.jpg",
    element: "Water",
    type: "Sword",
    number: 25,
    meaning:
      "Emotional truth, intuitive clarity, and heart-centered decisions. This card indicates a time when your emotional wisdom and intuition allow you to cut through confusion with compassion and make decisions that honor your feelings and relationships.",
    reversedMeaning:
      "Emotional confusion, intuitive blocks, or decisions clouded by feelings. You may be struggling to discern emotional truth from projection or finding it difficult to make clear decisions about relationships.",
    keywords: ["emotion", "clarity", "intuition", "decision", "compassion"],
    description:
      "The Sword of Water represents the blade of emotional truth that cuts through illusion. It symbolizes the power of decisive action guided by intuition and emotional wisdom.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing insight that brings clarity to emotional matters.",
    numerologicalSignificance:
      "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through emotional and intuitive understanding.",
  },
  {
    id: "sword-air-25",
    name: "Sword of Air",
    image: "/cards/25sword-air.jpg",
    element: "Air",
    type: "Sword",
    number: 25,
    meaning:
      "Mental truth, intellectual clarity, and logical decisions. This card indicates a time when your mental acuity is at its peak, allowing you to cut through confusion with sharp intellect and make decisions based on clear thinking and communication.",
    reversedMeaning:
      "Mental confusion, overthinking, or communication barriers. You may be experiencing a disconnect between your thoughts and your ability to express them, or finding that logic alone is insufficient for the decisions you face.",
    keywords: ["intellect", "clarity", "communication", "decision", "logic"],
    description:
      "The Sword of Air represents the blade of mental truth that cuts through illusion. It symbolizes the power of decisive action guided by clear thinking and precise communication.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the sharp edge of thought that brings clarity through analysis.",
    numerologicalSignificance:
      "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through intellectual investigation.",
  },
  {
    id: "sword-spirit-25",
    name: "Sword of Spirit",
    image: "/cards/25sword-spirit.jpg",
    element: "Spirit",
    type: "Sword",
    number: 25,
    meaning:
      "Divine truth, spiritual clarity, and soul-aligned decisions. This card indicates a time when your connection to higher wisdom allows you to cut through illusion with spiritual insight and make decisions that align with your soul's purpose.",
    reversedMeaning:
      "Spiritual confusion, disconnection from higher guidance, or decisions that conflict with your true purpose. You may be struggling to discern divine truth or feeling that your spiritual path is unclear.",
    keywords: ["divinity", "clarity", "purpose", "decision", "alignment"],
    description:
      "The Sword of Spirit represents the blade of divine truth that cuts through illusion. It symbolizes the power of decisive action guided by spiritual wisdom and higher consciousness.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent insight that brings clarity to spiritual matters.",
    numerologicalSignificance:
      "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through spiritual discernment.",
  },

  // Sword Series 52
  {
    id: "sword-fire-52",
    name: "Sword of Fire",
    image: "/cards/52sword-fire.jpg",
    element: "Fire",
    type: "Sword",
    number: 52,
    meaning:
      "Passionate truth, creative clarity, and transformative decisions. This card indicates a time when your passion and clarity align, allowing you to cut through confusion with the fire of inspiration and make decisions that transform your path.",
    reversedMeaning:
      "Destructive impulses, creative blocks, or passion without direction. You may be experiencing a disconnect between your truth and your passion, leading to impulsive actions or creative frustration.",
    keywords: ["passion", "clarity", "transformation", "decision", "action"],
    description:
      "The Sword of Fire represents the blade of passion and transformation that cuts through illusion. It symbolizes the power of decisive action fueled by creative fire and transformative energy.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying and energizing nature of flame.",
    numerologicalSignificance:
      "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through passionate exploration.",
  },
  {
    id: "sword-earth-52",
    name: "Sword of Earth",
    image: "/cards/52sword-earth.jpg",
    element: "Earth",
    type: "Sword",
    number: 52,
    meaning:
      "Practical truth, material clarity, and grounded decisions. This card indicates a time when your practical wisdom allows you to cut through confusion with stability and make decisions that establish or protect your material foundation.",
    reversedMeaning:
      "Impractical thinking, material confusion, or indecision about practical matters. You may be struggling to see the practical truth of a situation or hesitating to make necessary decisions about material concerns.",
    keywords: ["practicality", "clarity", "decision", "stability", "truth"],
    description:
      "The Sword of Earth represents the blade of practical truth that cuts through illusion. It symbolizes the power of decisive action grounded in material wisdom and practical understanding.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings clarity to material concerns.",
    numerologicalSignificance:
      "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through practical investigation.",
  },
  {
    id: "sword-air-52",
    name: "Sword of Air",
    image: "/cards/52sword-air.jpg",
    element: "Air",
    type: "Sword",
    number: 52,
    meaning:
      "Mental truth, intellectual clarity, and logical decisions. This card indicates a time when your mental acuity is at its peak, allowing you to cut through confusion with sharp intellect and make decisions based on clear thinking and communication.",
    reversedMeaning:
      "Mental confusion, overthinking, or communication barriers. You may be experiencing a disconnect between your thoughts and your ability to express them, or finding that logic alone is insufficient for the decisions you face.",
    keywords: ["intellect", "clarity", "communication", "decision", "logic"],
    description:
      "The Sword of Air represents the blade of mental truth that cuts through illusion. It symbolizes the power of decisive action guided by clear thinking and precise communication.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the sharp edge of thought that brings clarity through analysis.",
    numerologicalSignificance:
      "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through intellectual investigation.",
  },
  {
    id: "sword-water-52",
    name: "Sword of Water",
    image: "/cards/52sword-water.jpg",
    element: "Water",
    type: "Sword",
    number: 52,
    meaning:
      "Emotional truth, intuitive clarity, and heart-centered decisions. This card indicates a time when your emotional wisdom and intuition allow you to cut through confusion with compassion and make decisions that honor your feelings and relationships.",
    reversedMeaning:
      "Emotional confusion, intuitive blocks, or decisions clouded by feelings. You may be struggling to discern emotional truth from projection or finding it difficult to make clear decisions about relationships.",
    keywords: ["emotion", "clarity", "intuition", "decision", "compassion"],
    description:
      "The Sword of Water represents the blade of emotional truth that cuts through illusion. It symbolizes the power of decisive action guided by intuition and emotional wisdom.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing insight that brings clarity to emotional matters.",
    numerologicalSignificance:
      "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through emotional and intuitive understanding.",
  },
  {
    id: "sword-spirit-52",
    name: "Sword of Spirit",
    image: "/cards/52sword-spirit.jpg",
    element: "Spirit",
    type: "Sword",
    number: 52,
    meaning:
      "Divine truth, spiritual clarity, and soul-aligned decisions. This card indicates a time when your connection to higher wisdom allows you to cut through illusion with spiritual insight and make decisions that align with your soul's purpose.",
    reversedMeaning:
      "Spiritual confusion, disconnection from higher guidance, or decisions that conflict with your true purpose. You may be struggling to discern divine truth or feeling that your spiritual path is unclear.",
    keywords: ["divinity", "clarity", "purpose", "decision", "alignment"],
    description:
      "The Sword of Spirit represents the blade of divine truth that cuts through illusion. It symbolizes the power of decisive action guided by spiritual wisdom and higher consciousness.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent insight that brings clarity to spiritual matters.",
    numerologicalSignificance:
      "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through spiritual discernment.",
  },

  // Spear Series 47
  {
    id: "spear-earth-47",
    name: "Spear of Earth",
    image: "/cards/47spear-earth.jpg",
    element: "Earth",
    type: "Spear",
    number: 47,
    meaning:
      "Material focus, practical direction, and physical goals. This card indicates the ability to direct your physical energy with precision, focus on tangible objectives, and pursue material goals with determination and groundedness.",
    reversedMeaning:
      "Material scatter, lack of practical focus, or misaligned physical energy. You may be struggling to concentrate on practical matters or finding your energy dispersed among too many material concerns.",
    keywords: ["focus", "practicality", "direction", "goals", "manifestation"],
    description:
      "The Spear of Earth represents the physical weapon that pierces through obstacles. It symbolizes the directed force of material energy and the power of focused manifestation.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings focus to material concerns.",
    numerologicalSignificance:
      "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between material focus and spiritual purpose.",
  },
  {
    id: "spear-fire-47",
    name: "Spear of Fire",
    image: "/cards/47spear-fire.jpg",
    element: "Fire",
    type: "Spear",
    number: 47,
    meaning:
      "Passionate focus, creative direction, and transformative goals. This card indicates the ability to direct your creative energy with precision, focus on inspirational objectives, and pursue transformative goals with determination and enthusiasm.",
    reversedMeaning:
      "Scattered passion, lack of creative focus, or misaligned transformative energy. You may be struggling to channel your enthusiasm effectively or finding your creative energy dispersed among too many projects.",
    keywords: ["focus", "passion", "direction", "creativity", "transformation"],
    description:
      "The Spear of Fire represents the passionate weapon that pierces through resistance. It symbolizes the directed force of creative energy and the power of focused transformation.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing force that brings focus to creative endeavors.",
    numerologicalSignificance:
      "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between creative focus and practical application.",
  },
  {
    id: "spear-water-47",
    name: "Spear of Water",
    image: "/cards/47spear-water.jpg",
    element: "Water",
    type: "Spear",
    number: 47,
    meaning:
      "Emotional focus, intuitive direction, and relational goals. This card indicates the ability to direct your emotional energy with precision, focus on intuitive objectives, and pursue relationship goals with determination and sensitivity.",
    reversedMeaning:
      "Emotional scatter, lack of intuitive focus, or misaligned relational energy. You may be struggling to channel your feelings effectively or finding your emotional energy dispersed among too many relationships.",
    keywords: ["focus", "emotion", "direction", "intuition", "relationships"],
    description:
      "The Spear of Water represents the flowing weapon that pierces through emotional barriers. It symbolizes the directed force of intuitive energy and the power of focused feeling.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing force that brings focus to emotional matters.",
    numerologicalSignificance:
      "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between emotional focus and rational understanding.",
  },
  {
    id: "spear-air-47",
    name: "Spear of Air",
    image: "/cards/47spear-air.jpg",
    element: "Air",
    type: "Spear",
    number: 47,
    meaning:
      "Mental focus, directed communication, and intellectual goals. This card indicates the ability to direct your mental energy with precision, focus on communicative objectives, and pursue intellectual goals with determination and clarity.",
    reversedMeaning:
      "Mental scatter, lack of communicative focus, or misaligned intellectual energy. You may be struggling to concentrate your thoughts or finding your mental energy dispersed among too many ideas.",
    keywords: ["focus", "intellect", "direction", "communication", "clarity"],
    description:
      "The Spear of Air represents the mental weapon that pierces through confusion. It symbolizes the directed force of intellectual energy and the power of focused thought.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the swift and penetrating nature of thought that brings focus to mental pursuits.",
    numerologicalSignificance:
      "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between intellectual focus and emotional understanding.",
  },
  {
    id: "spear-spirit-47",
    name: "Spear of Spirit",
    image: "/cards/47spear-spirit.jpg",
    element: "Spirit",
    type: "Spear",
    number: 47,
    meaning:
      "Spiritual focus, divine direction, and soul-aligned goals. This card indicates the ability to direct your spiritual energy with precision, focus on divine objectives, and pursue soul-aligned goals with determination and higher awareness.",
    reversedMeaning:
      "Spiritual scatter, lack of divine focus, or misaligned soul energy. You may be struggling to channel your spiritual awareness effectively or finding your divine energy dispersed among too many paths.",
    keywords: ["focus", "spirit", "direction", "divinity", "purpose"],
    description:
      "The Spear of Spirit represents the divine weapon that pierces through illusion. It symbolizes the directed force of spiritual energy and the power of focused consciousness.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent force that brings focus to spiritual matters.",
    numerologicalSignificance:
      "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between spiritual focus and material manifestation.",
  },

  // Spear Series 74
  {
    id: "spear-air-74",
    name: "Spear of Air",
    image: "/cards/74spear-air.jpg",
    element: "Air",
    type: "Spear",
    number: 74,
    meaning:
      "Mental focus, directed communication, and intellectual goals. This card indicates the ability to direct your mental energy with precision, communicate your ideas clearly, and pursue intellectual objectives with determination.",
    reversedMeaning:
      "Mental scatter, communication barriers, or unfocused thoughts. You may be struggling to concentrate or express your ideas effectively, leading to confusion or misunderstandings.",
    keywords: ["focus", "communication", "intellect", "direction", "clarity"],
    description:
      "The Spear of Air represents the mental weapon that pierces through confusion and ignorance. It symbolizes the directed force of the intellect and the power of focused thought.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the swift and penetrating nature of thought.",
    numerologicalSignificance:
      "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between opposing ideas or perspectives.",
  },
  {
    id: "spear-earth-74",
    name: "Spear of Earth",
    image: "/cards/74spear-earth.jpg",
    element: "Earth",
    type: "Spear",
    number: 74,
    meaning:
      "Material focus, practical direction, and physical goals. This card indicates the ability to direct your physical energy with precision, focus on tangible objectives, and pursue material goals with determination and groundedness.",
    reversedMeaning:
      "Material scatter, lack of practical focus, or misaligned physical energy. You may be struggling to concentrate on practical matters or finding your energy dispersed among too many material concerns.",
    keywords: ["focus", "practicality", "direction", "goals", "manifestation"],
    description:
      "The Spear of Earth represents the physical weapon that pierces through obstacles. It symbolizes the directed force of material energy and the power of focused manifestation.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings focus to material concerns.",
    numerologicalSignificance:
      "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between material focus and spiritual purpose.",
  },
  {
    id: "spear-fire-74",
    name: "Spear of Fire",
    image: "/cards/74spear-fire.jpg",
    element: "Fire",
    type: "Spear",
    number: 74,
    meaning:
      "Passionate focus, creative direction, and transformative goals. This card indicates the ability to direct your creative energy with precision, focus on inspirational objectives, and pursue transformative goals with determination and enthusiasm.",
    reversedMeaning:
      "Scattered passion, lack of creative focus, or misaligned transformative energy. You may be struggling to channel your enthusiasm effectively or finding your creative energy dispersed among too many projects.",
    keywords: ["focus", "passion", "direction", "creativity", "transformation"],
    description:
      "The Spear of Fire represents the passionate weapon that pierces through resistance. It symbolizes the directed force of creative energy and the power of focused transformation.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing force that brings focus to creative endeavors.",
    numerologicalSignificance:
      "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between creative focus and practical application.",
  },
  {
    id: "spear-water-74",
    name: "Spear of Water",
    image: "/cards/74spear-water.jpg",
    element: "Water",
    type: "Spear",
    number: 74,
    meaning:
      "Emotional focus, intuitive direction, and relational goals. This card indicates the ability to direct your emotional energy with precision, focus on intuitive objectives, and pursue relationship goals with determination and sensitivity.",
    reversedMeaning:
      "Emotional scatter, lack of intuitive focus, or misaligned relational energy. You may be struggling to channel your feelings effectively or finding your emotional energy dispersed among too many relationships.",
    keywords: ["focus", "emotion", "direction", "intuition", "relationships"],
    description:
      "The Spear of Water represents the flowing weapon that pierces through emotional barriers. It symbolizes the directed force of intuitive energy and the power of focused feeling.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing force that brings focus to emotional matters.",
    numerologicalSignificance:
      "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between emotional focus and rational understanding.",
  },
  {
    id: "spear-spirit-74",
    name: "Spear of Spirit",
    image: "/cards/74spear-spirit.jpg",
    element: "Spirit",
    type: "Spear",
    number: 74,
    meaning:
      "Spiritual focus, divine direction, and soul-aligned goals. This card indicates the ability to direct your spiritual energy with precision, focus on divine objectives, and pursue soul-aligned goals with determination and higher awareness.",
    reversedMeaning:
      "Spiritual scatter, lack of divine focus, or misaligned soul energy. You may be struggling to channel your spiritual awareness effectively or finding your divine energy dispersed among too many paths.",
    keywords: ["focus", "spirit", "direction", "divinity", "purpose"],
    description:
      "The Spear of Spirit represents the divine weapon that pierces through illusion. It symbolizes the directed force of spiritual energy and the power of focused consciousness.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent force that brings focus to spiritual matters.",
    numerologicalSignificance:
      "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between spiritual focus and material manifestation.",
  },

  // Stone Series 69
  {
    id: "stone-earth-69",
    name: "Stone of Earth",
    image: "/cards/69stone-earth.jpg",
    element: "Earth",
    type: "Stone",
    number: 69,
    meaning:
      "Material foundation, physical stability, and grounded presence. This card indicates a strong connection to the physical world, providing a solid foundation for material growth and tangible achievements.",
    reversedMeaning:
      "Material instability, physical imbalance, or lack of groundedness. You may be feeling disconnected from your physical needs or experiencing uncertainty in your material foundation.",
    keywords: ["foundation", "stability", "grounding", "material", "presence"],
    description:
      "The Stone of Earth represents the foundation stone of physical existence. It symbolizes the solid, unchanging nature of earth that provides stability in the material realm.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that anchors spiritual energy in physical form.",
    numerologicalSignificance:
      "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of material resources and physical well-being.",
  },
  {
    id: "stone-fire-69",
    name: "Stone of Fire",
    image: "/cards/69stone-fire.jpg",
    element: "Fire",
    type: "Stone",
    number: 69,
    meaning:
      "Passionate foundation, creative stability, and transformative presence. This card indicates a strong connection to your creative and spiritual fire, providing a solid foundation for inspiration and transformation.",
    reversedMeaning:
      "Creative instability, passionate imbalance, or lack of transformative grounding. You may be feeling disconnected from your creative source or experiencing uncertainty in your spiritual fire.",
    keywords: ["foundation", "passion", "creativity", "transformation", "presence"],
    description:
      "The Stone of Fire represents the foundation stone of creative and transformative existence. It symbolizes the enduring flame that provides stability in the midst of change and transformation.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the stabilizing force within the dynamic energy of fire.",
    numerologicalSignificance:
      "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of creative gifts and transformative processes.",
  },
  {
    id: "stone-water-69",
    name: "Stone of Water",
    image: "/cards/69stone-water.jpg",
    element: "Water",
    type: "Stone",
    number: 69,
    meaning:
      "Emotional foundation, intuitive stability, and flowing presence. This card indicates a strong connection to your emotional wisdom and intuition, providing a solid foundation for relationships and psychic awareness.",
    reversedMeaning:
      "Emotional instability, intuitive imbalance, or lack of relational grounding. You may be feeling disconnected from your emotional center or experiencing uncertainty in your intuitive guidance.",
    keywords: ["foundation", "emotion", "intuition", "relationships", "flow"],
    description:
      "The Stone of Water represents the foundation stone of emotional and intuitive existence. It symbolizes the steady current that provides stability in the midst of emotional tides and intuitive insights.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the anchoring force within the flowing energy of water.",
    numerologicalSignificance:
      "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of emotional connections and intuitive gifts.",
  },
  {
    id: "stone-air-69",
    name: "Stone of Air",
    image: "/cards/69stone-air.jpg",
    element: "Air",
    type: "Stone",
    number: 69,
    meaning:
      "Mental foundation, intellectual stability, and communicative presence. This card indicates a strong connection to your mental wisdom and communicative abilities, providing a solid foundation for learning and sharing knowledge.",
    reversedMeaning:
      "Mental instability, intellectual imbalance, or lack of communicative grounding. You may be feeling disconnected from your mental center or experiencing uncertainty in your ability to express ideas.",
    keywords: ["foundation", "intellect", "communication", "ideas", "clarity"],
    description:
      "The Stone of Air represents the foundation stone of mental and communicative existence. It symbolizes the steady current of thought that provides stability in the midst of intellectual exploration and exchange.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the anchoring force within the swift energy of air.",
    numerologicalSignificance:
      "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of intellectual gifts and communicative abilities.",
  },
  {
    id: "stone-spirit-69",
    name: "Stone of Spirit",
    image: "/cards/69stone-spirit.jpg",
    element: "Spirit",
    type: "Stone",
    number: 69,
    meaning:
      "Spiritual foundation, divine stability, and soul presence. This card indicates a strong connection to your higher self and spiritual purpose, providing a solid foundation for your spiritual journey and growth.",
    reversedMeaning:
      "Spiritual instability, divine imbalance, or lack of soul grounding. You may be feeling disconnected from your spiritual essence or experiencing uncertainty in your divine purpose.",
    keywords: ["foundation", "spirit", "divinity", "purpose", "presence"],
    description:
      "The Stone of Spirit represents the foundation stone of spiritual existence and divine connection. It symbolizes the eternal, unchanging nature of spirit that provides stability in the midst of life's changes.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the anchoring force within the transcendent energy of spirit.",
    numerologicalSignificance:
      "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of spiritual connections and divine purpose.",
  },

  // Stone Series 96
  {
    id: "stone-spirit-96",
    name: "Stone of Spirit",
    image: "/cards/96stone-spirit.jpg",
    element: "Spirit",
    type: "Stone",
    number: 96,
    meaning:
      "Spiritual foundation, divine stability, and soul presence. This card indicates a strong connection to your higher self and spiritual purpose, providing a solid foundation for your spiritual journey and growth.",
    reversedMeaning:
      "Spiritual instability, disconnection from your higher self, or lack of spiritual grounding. You may be feeling adrift in your spiritual practice or disconnected from your sense of purpose.",
    keywords: ["foundation", "spirit", "stability", "presence", "connection"],
    description:
      "The Stone of Spirit represents the foundation stone of spiritual existence and divine connection. It symbolizes the eternal, unchanging nature of spirit that provides stability in the midst of life's changes.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the quintessence that transcends and unifies.",
    numerologicalSignificance:
      "As a number 96 card (reducing to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of spiritual connections and community.",
  },
  {
    id: "stone-earth-96",
    name: "Stone of Earth",
    image: "/cards/96stone-earth.jpg",
    element: "Earth",
    type: "Stone",
    number: 96,
    meaning:
      "Material foundation, physical stability, and grounded presence. This card indicates a strong connection to the physical world, providing a solid foundation for material growth and tangible achievements.",
    reversedMeaning:
      "Material instability, physical imbalance, or lack of groundedness. You may be feeling disconnected from your physical needs or experiencing uncertainty in your material foundation.",
    keywords: ["foundation", "stability", "grounding", "material", "presence"],
    description:
      "The Stone of Earth represents the foundation stone of physical existence. It symbolizes the solid, unchanging nature of earth that provides stability in the material realm.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that anchors spiritual energy in physical form.",
    numerologicalSignificance:
      "As a number 96 card (reducing to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of material resources and physical well-being.",
  },
  {
    id: "stone-fire-96",
    name: "Stone of Fire",
    image: "/cards/96stone-fire.jpg",
    element: "Fire",
    type: "Stone",
    number: 96,
    meaning:
      "Passionate foundation, creative stability, and transformative presence. This card indicates a strong connection to your creative and spiritual fire, providing a solid foundation for inspiration and transformation.",
    reversedMeaning:
      "Creative instability, passionate imbalance, or lack of transformative grounding. You may be feeling disconnected from your creative source or experiencing uncertainty in your spiritual fire.",
    keywords: ["foundation", "passion", "creativity", "transformation", "presence"],
    description:
      "The Stone of Fire represents the foundation stone of creative and transformative existence. It symbolizes the enduring flame that provides stability in the midst of change and transformation.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the stabilizing force within the dynamic energy of fire.",
    numerologicalSignificance:
      "As a number 96 card (reducing to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of creative gifts and transformative processes.",
  },
  {
    id: "stone-water-96",
    name: "Stone of Water",
    image: "/cards/96stone-water.jpg",
    element: "Water",
    type: "Stone",
    number: 96,
    meaning:
      "Emotional foundation, intuitive stability, and flowing presence. This card indicates a strong connection to your emotional wisdom and intuition, providing a solid foundation for relationships and psychic awareness.",
    reversedMeaning:
      "Emotional instability, intuitive imbalance, or lack of relational grounding. You may be feeling disconnected from your emotional center or experiencing uncertainty in your intuitive guidance.",
    keywords: ["foundation", "emotion", "intuition", "relationships", "flow"],
    description:
      "The Stone of Water represents the foundation stone of emotional and intuitive existence. It symbolizes the steady current that provides stability in the midst of emotional tides and intuitive insights.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the anchoring force within the flowing energy of water.",
    numerologicalSignificance:
      "As a number 96 card (reducing to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of emotional connections and intuitive gifts.",
  },
  {
    id: "stone-air-96",
    name: "Stone of Air",
    image: "/cards/96stone-air.jpg",
    element: "Air",
    type: "Stone",
    number: 96,
    meaning:
      "Mental foundation, intellectual stability, and communicative presence. This card indicates a strong connection to your mental wisdom and communicative abilities, providing a solid foundation for learning and sharing knowledge.",
    reversedMeaning:
      "Mental instability, intellectual imbalance, or lack of communicative grounding. You may be feeling disconnected from your mental center or experiencing uncertainty in your ability to express ideas.",
    keywords: ["foundation", "intellect", "communication", "ideas", "clarity"],
    description:
      "The Stone of Air represents the foundation stone of mental and communicative existence. It symbolizes the steady current of thought that provides stability in the midst of intellectual exploration and exchange.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the anchoring force within the swift energy of air.",
    numerologicalSignificance:
      "As a number 96 card (reducing to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of intellectual gifts and communicative abilities.",
  },

  // Cord Series 38
  {
    id: "cord-earth-38",
    name: "Cord of Earth",
    image: "/cards/38cord-earth.jpg",
    element: "Earth",
    type: "Cord",
    number: 38,
    meaning:
      "Material connection, physical bonds, and tangible relationships. This card indicates important connections in the material world, whether to people, places, or possessions, that provide grounding and stability in your life.",
    reversedMeaning:
      "Material entanglement, unhealthy attachment, or physical restriction. You may be experiencing connections that limit rather than support your growth, or feeling overly attached to material possessions or circumstances.",
    keywords: ["connection", "material", "bonds", "stability", "attachment"],
    description:
      "The Cord of Earth represents the binding thread of physical connection. It symbolizes the tangible bonds that connect us to the material world and to others in practical ways.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding connections that anchor us in physical reality.",
    numerologicalSignificance:
      "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the material realm.",
  },
  {
    id: "cord-fire-38",
    name: "Cord of Fire",
    image: "/cards/38cord-fire.jpg",
    element: "Fire",
    type: "Cord",
    number: 38,
    meaning:
      "Passionate connection, creative bonds, and transformative relationships. This card indicates important connections fueled by shared passion, creativity, or spiritual growth, that inspire and transform you.",
    reversedMeaning:
      "Passionate entanglement, creative codependence, or transformative restriction. You may be experiencing connections that burn too intensely or feeling that your creative or spiritual growth is limited by certain relationships.",
    keywords: ["connection", "passion", "creativity", "transformation", "inspiration"],
    description:
      "The Cord of Fire represents the binding thread of passionate connection. It symbolizes the energetic bonds that connect us through shared enthusiasm, creativity, and transformative experiences.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the inspiring connections that fuel our growth and transformation.",
    numerologicalSignificance:
      "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of passion and creativity.",
  },
  {
    id: "cord-water-38",
    name: "Cord of Water",
    image: "/cards/38cord-water.jpg",
    element: "Water",
    type: "Cord",
    number: 38,
    meaning:
      "Emotional connection, intuitive bonds, and flowing relationships. This card indicates important connections based on emotional resonance, intuitive understanding, or psychic links, that nurture and support your emotional well-being.",
    reversedMeaning:
      "Emotional entanglement, intuitive codependence, or relational restriction. You may be experiencing connections that drain rather than nourish you, or feeling that your emotional growth is limited by certain relationships.",
    keywords: ["connection", "emotion", "intuition", "flow", "nurturing"],
    description:
      "The Cord of Water represents the binding thread of emotional connection. It symbolizes the flowing bonds that connect us through shared feelings, intuitive understanding, and emotional resonance.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the nurturing connections that support our emotional well-being.",
    numerologicalSignificance:
      "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of emotions and intuition.",
  },
  {
    id: "cord-air-38",
    name: "Cord of Air",
    image: "/cards/38cord-air.jpg",
    element: "Air",
    type: "Cord",
    number: 38,
    meaning:
      "Mental connection, communicative bonds, and intellectual relationships. This card indicates important connections based on shared ideas, communication, or learning, that stimulate and expand your mind.",
    reversedMeaning:
      "Mental entanglement, communicative codependence, or intellectual restriction. You may be experiencing connections that confuse rather than clarify, or feeling that your mental growth is limited by certain relationships.",
    keywords: ["connection", "intellect", "communication", "ideas", "learning"],
    description:
      "The Cord of Air represents the binding thread of mental connection. It symbolizes the invisible bonds that connect us through shared thoughts, communication, and intellectual pursuits.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the stimulating connections that expand our understanding and perspective.",
    numerologicalSignificance:
      "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of thought and communication.",
  },
  {
    id: "cord-spirit-38",
    name: "Cord of Spirit",
    image: "/cards/38cord-spirit.jpg",
    element: "Spirit",
    type: "Cord",
    number: 38,
    meaning:
      "Spiritual connection, divine bonds, and soul relationships. This card indicates important connections based on shared spiritual paths, soul recognition, or divine purpose, that elevate and align you with your highest self.",
    reversedMeaning:
      "Spiritual entanglement, divine codependence, or soul restriction. You may be experiencing connections that distract rather than direct you spiritually, or feeling that your spiritual growth is limited by certain relationships.",
    keywords: ["connection", "spirit", "divinity", "soul", "purpose"],
    description:
      "The Cord of Spirit represents the binding thread of spiritual connection. It symbolizes the eternal bonds that connect us through shared divine essence, soul recognition, and spiritual purpose.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent connections that unite us beyond the physical realm.",
    numerologicalSignificance:
      "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of spirit and divine purpose.",
  },

  // Cord Series 83
  {
    id: "cord-earth-83",
    name: "Cord of Earth",
    image: "/cards/83cord-earth.jpg",
    element: "Earth",
    type: "Cord",
    number: 83,
    meaning:
      "Material connection, physical bonds, and tangible relationships. This card indicates important connections in the material world, whether to people, places, or possessions, that provide grounding and stability in your life.",
    reversedMeaning:
      "Material entanglement, unhealthy attachment, or physical restriction. You may be experiencing connections that limit rather than support your growth, or feeling overly attached to material possessions or circumstances.",
    keywords: ["connection", "material", "bonds", "stability", "attachment"],
    description:
      "The Cord of Earth represents the binding thread of physical connection. It symbolizes the tangible bonds that connect us to the material world and to others in practical ways.",
    elementalAffinity:
      "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding connections that anchor us in physical reality.",
    numerologicalSignificance:
      "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the material realm.",
  },
  {
    id: "cord-fire-83",
    name: "Cord of Fire",
    image: "/cards/83cord-fire.jpg",
    element: "Fire",
    type: "Cord",
    number: 83,
    meaning:
      "Passionate connection, creative bonds, and transformative relationships. This card indicates important connections fueled by shared passion, creativity, or spiritual growth, that inspire and transform you.",
    reversedMeaning:
      "Passionate entanglement, creative codependence, or transformative restriction. You may be experiencing connections that burn too intensely or feeling that your creative or spiritual growth is limited by certain relationships.",
    keywords: ["connection", "passion", "creativity", "transformation", "inspiration"],
    description:
      "The Cord of Fire represents the binding thread of passionate connection. It symbolizes the energetic bonds that connect us through shared enthusiasm, creativity, and transformative experiences.",
    elementalAffinity:
      "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the inspiring connections that fuel our growth and transformation.",
    numerologicalSignificance:
      "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of passion and creativity.",
  },
  {
    id: "cord-water-83",
    name: "Cord of Water",
    image: "/cards/83cord-water.jpg",
    element: "Water",
    type: "Cord",
    number: 83,
    meaning:
      "Emotional connection, intuitive bonds, and flowing relationships. This card indicates important connections based on emotional resonance, intuitive understanding, or psychic links, that nurture and support your emotional well-being.",
    reversedMeaning:
      "Emotional entanglement, intuitive codependence, or relational restriction. You may be experiencing connections that drain rather than nourish you, or feeling that your emotional growth is limited by certain relationships.",
    keywords: ["connection", "emotion", "intuition", "flow", "nurturing"],
    description:
      "The Cord of Water represents the binding thread of emotional connection. It symbolizes the flowing bonds that connect us through shared feelings, intuitive understanding, and emotional resonance.",
    elementalAffinity:
      "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the nurturing connections that support our emotional well-being.",
    numerologicalSignificance:
      "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of emotions and intuition.",
  },
  {
    id: "cord-air-83",
    name: "Cord of Air",
    image: "/cards/83cord-air.jpg",
    element: "Air",
    type: "Cord",
    number: 83,
    meaning:
      "Mental connection, communicative bonds, and intellectual relationships. This card indicates important connections based on shared ideas, communication, or learning, that stimulate and expand your mind.",
    reversedMeaning:
      "Mental entanglement, communicative codependence, or intellectual restriction. You may be experiencing connections that confuse rather than clarify, or feeling that your mental growth is limited by certain relationships.",
    keywords: ["connection", "intellect", "communication", "ideas", "learning"],
    description:
      "The Cord of Air represents the binding thread of mental connection. It symbolizes the invisible bonds that connect us through shared thoughts, communication, and intellectual pursuits.",
    elementalAffinity:
      "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the stimulating connections that expand our understanding and perspective.",
    numerologicalSignificance:
      "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of thought and communication.",
  },
  {
    id: "cord-spirit-83",
    name: "Cord of Spirit",
    image: "/cards/83cord-spirit.jpg",
    element: "Spirit",
    type: "Cord",
    number: 83,
    meaning:
      "Spiritual connection, divine bonds, and soul relationships. This card indicates important connections based on shared spiritual paths, soul recognition, or divine purpose, that elevate and align you with your highest self.",
    reversedMeaning:
      "Spiritual entanglement, divine codependence, or soul restriction. You may be experiencing connections that distract rather than direct you spiritually, or feeling that your spiritual growth is limited by certain relationships.",
    keywords: ["connection", "spirit", "divinity", "soul", "purpose"],
    description:
      "The Cord of Spirit represents the binding thread of spiritual connection. It symbolizes the eternal bonds that connect us through shared divine essence, soul recognition, and spiritual purpose.",
    elementalAffinity:
      "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent connections that unite us beyond the physical realm.",
    numerologicalSignificance:
      "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of spirit and divine purpose.",
  },
]

export function CardLibrary() {
  const [selectedCard, setSelectedCard] = useState<LibraryCard | null>(null)
  const [filter, setFilter] = useState({
    element: "",
    type: "",
  })

  // Get unique elements and types for filters
  const elements = Array.from(new Set(libraryCards.map((card) => card.element)))
  const types = Array.from(new Set(libraryCards.map((card) => card.type)))

  // Filter cards based on selected filters
  const filteredCards = libraryCards.filter((card) => {
    return (
      (filter.element === "" || card.element === filter.element) && (filter.type === "" || card.type === filter.type)
    )
  })

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mr-2 text-sm font-medium">Element:</label>
          <select
            className="rounded border p-1"
            value={filter.element}
            onChange={(e) => setFilter({ ...filter, element: e.target.value })}
          >
            <option value="">All</option>
            {elements.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Type:</label>
          <select
            className="rounded border p-1"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-transform hover:scale-105"
            onClick={() => setSelectedCard(card)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img src={card.image || "/placeholder.svg"} alt={card.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{card.name}</h3>
              <p className="text-sm text-gray-600">
                {card.element} • {card.type} • #{card.number}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
              <button onClick={() => setSelectedCard(null)} className="text-2xl font-bold">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex justify-center">
                <img
                  src={selectedCard.image || "/placeholder.svg"}
                  alt={selectedCard.name}
                  className="max-h-80 rounded-lg object-contain"
                />
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Element:</span> {selectedCard.element}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Type:</span> {selectedCard.type}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Number:</span> {selectedCard.number}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Keywords:</span> {selectedCard.keywords.join(", ")}
                </p>
                <p className="mb-2 font-semibold">Meaning:</p>
                <p className="mb-4">{selectedCard.meaning}</p>
                <p className="mb-2 font-semibold">Reversed Meaning:</p>
                <p className="mb-4">{selectedCard.reversedMeaning}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 font-semibold">Description:</p>
              <p className="mb-4">{selectedCard.description}</p>
              <p className="mb-2 font-semibold">Elemental Affinity:</p>
              <p className="mb-4">{selectedCard.elementalAffinity}</p>
              <p className="mb-2 font-semibold">Numerological Significance:</p>
              <p>{selectedCard.numerologicalSignificance}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
