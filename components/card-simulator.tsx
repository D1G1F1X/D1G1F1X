"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shuffle,
  Save,
  Share2,
  User,
  Clock,
  Info,
  Eye,
  EyeOff,
  AlertCircle,
  Wifi,
  WifiOff,
  MessageCircle,
  Loader2,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PrivacyNotice } from "@/components/privacy-notice"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"
import { getCardImageUrl, preloadCardImages } from "@/lib/card-image-blob-handler"
import { Progress } from "@/components/ui/progress"
import { AssistantChat } from "@/components/assistant-chat"

// Complete NUMO Oracle Card Data Structure
interface Symbol {
  key: string
  value: string
}

interface OracleCard {
  id: string
  number: string
  suit: string
  fullTitle: string
  symbols: Symbol[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string
  imagePath?: string
}

// Complete MASTER Card Data from the JSON
const masterCardData: OracleCard[] = [
  {
    id: "0-Cauldron",
    number: "0",
    suit: "Cauldron",
    fullTitle: "0 Cauldron – The Cauldron of Creation",
    symbols: [
      { key: "Number", value: "0" },
      { key: "Suit", value: "Cauldron" },
      { key: "Element (Base)", value: "Spirit" },
      { key: "Planet (Internal Influence)", value: "Pluto – deep transformation, inner renewal, and hidden power." },
      { key: "Astrology (External Domain)", value: "Scorpio – cycles of death and rebirth, secrets, intensity." },
      { key: "Icon", value: "Pentagram" },
      { key: "Orientation", value: "Cooking" },
      { key: "Sacred Geometry", value: "Dot" },
      { key: "Synergistic Element", value: "Fire" },
    ],
    symbolismBreakdown: [
      "Number: 0 – Symbol of unmanifest potential—the infinite womb of all creation, representing the void from which all possibilities emerge, a state of pure being before differentiation. It is the alpha and omega, containing everything and nothing simultaneously.",
      "Suit (Cauldron): In its cooking orientation, the cauldron stews possibility into reality, slowly combining all elements into creation. This signifies a gentle, nurturing, alchemical process where diverse ingredients (experiences, energies, ideas) are patiently blended and transmuted into a new, unified whole.",
      "Icon (Pentagram): Represents balance of the five elements—earth (stability, form), air (intellect, communication), fire (energy, action), water (emotion, intuition), and spirit (life force, connection to the divine). It symbolizes integration, protection, and the perfected human in harmony with the cosmos.",
      "Orientation (Cooking): Indicates that the creation is in progress, not yet released. This highlights a phase of internal development, gestation, and careful preparation, where the transformative work is happening beneath the surface, shielded from external view until ready.",
      "Sacred Geometry (Dot): The spark of origin—the first point from which all things emerge. It is the singularity, the concentrated seed of potential, the initial impulse of consciousness before expansion into dimension and form. A symbol of unity and wholeness.",
      "Planet (Pluto): Deep, transformative forces working behind the scenes. Pluto governs the subconscious realms, instigating profound metamorphosis by unearthing hidden truths, dismantling old structures, and facilitating regeneration and rebirth from the ashes of what was.",
      "Astrology (Scorpio): Reflects external themes of rebirth, secrecy, and shedding of old layers. Scorpio navigates the depths of existence, confronting power dynamics, intense emotions, and the mysteries of life and death, ultimately leading to profound healing and empowerment.",
      "Synergistic Element (Fire): The combustion of Spirit and Water—the ignition of creation and passion. Fire is the activating, dynamic principle that fuels transformation, provides courage, and illuminates the path, turning inspiration (Spirit) and emotional depth (Water) into tangible manifestation.",
    ],
    keyMeanings: [
      "Creation in Progress: Energy is stirring, but not yet ready to emerge. This signifies a nascent stage where potential is palpable but requires further nurturing and internal development before it can be fully expressed or witnessed externally.",
      "Alchemy and Transformation: Inner metamorphosis is occurring beneath the surface. Like the alchemical process of turning lead into gold, this points to profound internal shifts, healing, and the integration of disparate parts of oneself into a more evolved state.",
      'Infinite Potential: Anything is possible, but it must go through the fire. The "fire" represents a necessary trial, purification, or intense experience that refines and tempers, unlocking the boundless creative power inherent in the initial void.',
      "Inner Depths: The process requires patience and surrender to unseen forces. This emphasizes the need for trust in the natural unfolding, a willingness to delve into one's own subconscious, and the wisdom to allow the creation to mature at its own pace without force.",
    ],
    baseElement: "Spirit",
    planetInternalInfluence: "Pluto – deep transformation, inner renewal, and hidden power.",
    astrologyExternalDomain: "Scorpio – cycles of death and rebirth, secrets, intensity.",
    iconSymbol: "Pentagram",
    orientation: "Cooking",
    sacredGeometry: "Dot",
    synergisticElement: "Fire",
  },
  {
    id: "1-Cauldron",
    number: "1",
    suit: "Cauldron",
    fullTitle: "1 Cauldron – The Cauldron of Manifestation",
    symbols: [
      { key: "Number", value: "1" },
      { key: "Suit", value: "Cauldron" },
      { key: "Element (Base)", value: "Fire" },
      { key: "Planet (Internal Influence)", value: "Sun – creative force, willpower, and illumination." },
      { key: "Astrology (External Domain)", value: "Leo – pride in expression, creative passion, dramatic emergence." },
      { key: "Icon", value: "Pentagram" },
      { key: "Orientation", value: "Pouring" },
      { key: "Sacred Geometry", value: "Plus Sign" },
      { key: "Synergistic Element", value: "Fire" },
    ],
    symbolismBreakdown: [
      "Number: 1 – The number of individuality and manifestation—initiation of purpose. It represents the first step, originality, leadership, and the power of focused will to bring ideas into concrete form. The singular point of action.",
      "Suit (Cauldron): Pouring forth its contents—the creation is emerging. The vessel now actively releases what has been brewing, symbolizing the sharing of gifts, ideas, or projects with the world. It's an act of giving and outward expression.",
      "Icon (Pentagram): Balanced elemental structure driving harmonious emergence. Here, the integrated elements provide a stable foundation for the creative output, ensuring that what is manifested is well-rounded and aligned with a greater harmony.",
      "Orientation (Pouring): Indicates readiness to act—release of the creation. This signifies a conscious decision to move from internal preparation to external action, sharing what has been cultivated. It's a dynamic and generous gesture.",
      "Sacred Geometry (Plus Sign): The crossroads of action and potential—energy merging. The plus sign represents the intersection of different planes or energies, creating a focal point where intention meets opportunity, leading to active creation and expansion.",
      "Planet (Sun): Drives inner willpower and identity into radiance. The Sun provides vitality, confidence, and clarity of purpose, illuminating the unique self and empowering its expression. It is the core of one's being shining forth.",
      "Astrology (Leo): External stage—performance, confidence, leadership. Leo embodies the joy of self-expression, the courage to take center stage, and the magnanimity of a natural leader, inspiring others through its radiant and creative presence.",
      "Synergistic Element (Fire): Fire and Spirit igniting the fires of birth and radiant will. This highlights the pure, active, and enthusiastic energy that fuels manifestation, transforming divine inspiration (Spirit) into passionate, visible action.",
    ],
    keyMeanings: [
      "Manifestation in Motion: Pour your energy into the world. This is a call to take deliberate action, to channel your creative forces and intentions into tangible outcomes and share your unique contributions.",
      "Personal Power: Lead the creation with your fire. Embrace your innate abilities, willpower, and passion to direct the course of your creations. Own your strength and capacity to make an impact.",
      "Creative Expression: Let your gifts be seen. Do not hide your talents or insights. This is the time to showcase what you have developed, to perform, to publish, to share your unique voice.",
      "Action-Oriented: Time to execute what you've been envisioning. Move beyond planning and dreaming into the realm of doing. Take the necessary steps to bring your visions into reality.",
    ],
    baseElement: "Fire",
    planetInternalInfluence: "Sun – creative force, willpower, and illumination.",
    astrologyExternalDomain: "Leo – pride in expression, creative passion, dramatic emergence.",
    iconSymbol: "Pentagram",
    orientation: "Pouring",
    sacredGeometry: "Plus Sign",
    synergisticElement: "Fire",
  },
  {
    id: "2-Sword",
    number: "2",
    suit: "Sword",
    fullTitle: "2 Sword - The Sword of Precision and Perception",
    symbols: [
      { key: "Number", value: "2" },
      { key: "Suit", value: "Sword" },
      { key: "Element (Base)", value: "Water" },
      { key: "Planet (Internal Influence)", value: "Moon – intuition, reflection, inner perception." },
      { key: "Astrology (External Domain)", value: "Cancer – protection, emotional depth, caregiving." },
      { key: "Icon", value: "Delta" },
      { key: "Orientation", value: "Point First" },
      { key: "Sacred Geometry", value: "Vesica Piscis" },
      { key: "Synergistic Element", value: "Water" },
    ],
    symbolismBreakdown: [
      "Number: 2 – Duality, balance, and reflection. Represents choices, partnerships, the weighing of options, and the need to find equilibrium between opposing forces. It highlights receptivity and the consideration of another perspective.",
      "Suit (Sword): The sword reflects clarity, intellect, and decision-making. It is a tool of truth, cutting through confusion and illusion, but here, tempered by Water, its precision is guided by feeling as much as logic.",
      "Icon (Delta): The Greek symbol for change—refinement through separation. Delta signifies a doorway or a point of transition, suggesting that clarity may come from distinguishing one thing from another, or from a shift in perspective.",
      "Orientation (Point First): Focused awareness and precision. The sword is ready for careful, deliberate action, guided by sharp perception. It implies aiming with intent, but not necessarily striking yet; the focus is on clear sight.",
      "Sacred Geometry (Vesica Piscis): The divine intersection—understanding through union. Formed by two overlapping circles, it symbolizes the meeting point of spirit and matter, conscious and unconscious, or two distinct entities, creating a space of shared understanding and creativity.",
      "Planet (Moon): Reflective depth, changeability, and emotional navigation. The Moon governs intuition, the subconscious, and the ebb and flow of emotions. Its influence encourages introspection and listening to inner guidance.",
      "Astrology (Cancer): Emotional awareness applied to outer security and nurturing. Cancer emphasizes the need for a secure emotional foundation, using intuition to protect and care for oneself and others. It brings a sensitive, empathetic quality to perception.",
      "Synergistic Element (Water): Water enhances the sword's clarity by infusing emotional depth into logical discernment, allowing intuition to guide precise thought. This creates a balance where intellect is informed by empathy, leading to more holistic understanding.",
    ],
    keyMeanings: [
      "Focused Awareness: Seeing clearly without reacting impulsively. This calls for keen observation and understanding of a situation before taking action, using both intellect and intuition to perceive the truth.",
      "Emotional Intelligence: Understanding one's own and others' inner worlds. It is the ability to recognize, understand, and manage your own emotions, and to understand and influence the emotions of others, leading to better decisions.",
      "Hesitation with Purpose: Listening and weighing choices before action. This is not procrastination, but a deliberate pause to ensure that any decision made is well-informed, balanced, and aligned with deeper intuitive knowing.",
      "Mental Alignment: The mind aligning with emotional intuition. True clarity comes when logical thought processes are harmonized with the wisdom of feelings, leading to choices that are both sound and soulful.",
    ],
    baseElement: "Water",
    planetInternalInfluence: "Moon – intuition, reflection, inner perception.",
    astrologyExternalDomain: "Cancer – protection, emotional depth, caregiving.",
    iconSymbol: "Delta",
    orientation: "Point First",
    sacredGeometry: "Vesica Piscis",
    synergisticElement: "Water",
  },
  {
    id: "3-Cord",
    number: "3",
    suit: "Cord",
    fullTitle: "3 Cord – The Cord of Purpose and Time",
    symbols: [
      { key: "Number", value: "3" },
      { key: "Suit", value: "Cord" },
      { key: "Element (Base)", value: "Fire" },
      { key: "Planet (Internal Influence)", value: "Jupiter – expansion, purpose, trust in time." },
      {
        key: "Astrology (External Domain)",
        value: "Sagittarius – truth-seeking, life journey, philosophical freedom.",
      },
      { key: "Icon", value: "Hourglass" },
      { key: "Orientation", value: "Knot Before" },
      { key: "Sacred Geometry", value: "Finite Symbol" },
      { key: "Synergistic Element", value: "Spirit" },
    ],
    symbolismBreakdown: [
      "Number: 3 – Completion of a small cycle—body, mind, spirit. Represents initial synthesis, creativity, expression, and the first stage of fruition. It's about bringing different elements together to create something new.",
      "Suit (Cord): Binds, restrains, or ends that which must be sealed. The cord symbolizes connection, commitment, but also the potential for limitation or the conclusion of a phase. It marks a point of definition.",
      "Icon (Hourglass): Measures time, inevitability, and clarity in limitation. The hourglass reminds us of the passage of time and the importance of using it wisely. It highlights cycles, deadlines, and the beauty found within defined parameters.",
      'Orientation (Knot Before): Suggests the binding is imminent—preparation for conclusion. A knot tied signifies commitment, a decision made, or a process being secured. "Knot Before" implies the final actions leading up to this sealing.',
      "Sacred Geometry (Finite Symbol): The edge of infinity-what is bounded must resolve. This likely refers to a symbol representing a closed loop or a defined boundary (perhaps the infinity symbol itself, representing cycles), indicating that within any given framework, resolution or completion is sought.",
      "Planet (Jupiter): Inner expansion through boundaries and endings. Jupiter brings growth, optimism, and a search for meaning. Even as a cycle concludes, Jupiter's influence ensures that this ending paves the way for greater understanding and future opportunities.",
      "Astrology (Sagittarius): External truth-seeking mission concluding a cycle. Sagittarius is associated with exploration, higher learning, and a quest for truth. This indicates that a particular journey of discovery or understanding is reaching a point of culmination.",
      "Synergistic Element (Spirit): Earth giving rise to release and ascension. Spirit here connects to the ethereal, the transcendent. As the earthly cycle (represented by the cord and its binding) completes, there's an opportunity for a release of energy or understanding to a higher level.",
    ],
    keyMeanings: [
      "Countdown to Release: A lesson or binding is reaching its final moment. There's a sense of anticipation as a period of learning, commitment, or a particular situation approaches its defined end, preparing for a transition.",
      "Truth Before Binding: A need to recognize what must be seen before closure. Before a cycle is fully completed or a commitment sealed, it's crucial to acknowledge all relevant truths and insights gained.",
      "Purpose Realized: The result of your actions must be accepted. The efforts and choices made within this cycle are now culminating, and it's time to own the outcomes, learning from them for future growth.",
      "Time's End: A cycle completes, but a journey continues inward. While an external phase may be finishing, the internal process of integration, learning, and spiritual development carries on, often deepened by the experience.",
    ],
    baseElement: "Fire",
    planetInternalInfluence: "Jupiter – expansion, purpose, trust in time.",
    astrologyExternalDomain: "Sagittarius – truth-seeking, life journey, philosophical freedom.",
    iconSymbol: "Hourglass",
    orientation: "Knot Before",
    sacredGeometry: "Finite Symbol",
    synergisticElement: "Spirit",
  },
  {
    id: "4-Spear",
    number: "4",
    suit: "Spear",
    fullTitle: "4 Spear - The Spear of Drive and Direction",
    symbols: [
      { key: "Number", value: "4" },
      { key: "Suit", value: "Spear" },
      { key: "Element (Base)", value: "Earth" },
      { key: "Planet (Internal Influence)", value: "Uranus – revolution, innovation, and personal awakening." },
      { key: "Astrology (External Domain)", value: "Aquarius – humanitarian focus, idealism, breaking tradition." },
      { key: "Icon", value: "Direction Arrows" },
      { key: "Orientation", value: "Shaft First" },
      { key: "Sacred Geometry", value: "Ladder" },
      { key: "Synergistic Element", value: "Air" },
    ],
    symbolismBreakdown: [
      "Number: 4 – Stability, foundation, the four corners of effort and space. Represents structure, order, practicality, and the establishment of a solid base. It's about building something lasting and reliable.",
      "Suit (Spear): A symbol of forward movement and protection through assertion. The spear is a tool for focused intention, direct action, and defending one's position or goals. It implies courage and a clear aim.",
      "Icon (Direction Arrows): Symbolizes the many directions our focus and purpose can take. This highlights choices in path, the ability to aim with precision, and the dynamic nature of pursuing goals. It can also mean clear guidance.",
      "Orientation (Shaft First): Emphasizes the need to develop stable momentum and a strong inner stance. Before the spearpoint finds its mark, the shaft provides balance, power, and controlled direction, signifying thorough preparation and a solid core.",
      "Sacred Geometry (Ladder): Represents ascension through structured effort. The ladder is a symbol of step-by-step progress, connecting different levels of understanding or achievement. Each rung is a necessary stage in the upward journey.",
      "Planet (Uranus): Brings disruptive insight and personal change. Uranus challenges the status quo with sudden breakthroughs, innovative ideas, and a call for freedom and authenticity, often leading to unexpected shifts in direction.",
      "Astrology (Aquarius): Connects external breakthroughs to idealistic purpose. Aquarius champions progress, humanitarianism, and unconventional thinking, seeking to apply innovative solutions for the betterment of the collective.",
      "Synergistic Element (Air): Fire combined with Air creates movement, clarity, and momentum. Air (intellect, communication) fans the flames of Fire (action, drive), providing strategic thinking and clear articulation to propel initiatives forward.",
    ],
    keyMeanings: [
      "Drive With Vision: Structured energy moving toward an ideal. This combines passionate motivation with a clear, well-defined goal and a practical plan, ensuring that effort is applied effectively and purposefully.",
      "Foundation for Action: Building what will carry the force forward. Before launching an initiative, it's crucial to establish a stable base, gather resources, and create the necessary support structures to sustain momentum.",
      "Revolutionary Roots: A new direction built on idealism and truth. This encourages breaking from outdated norms if necessary, guided by a strong sense of purpose and a commitment to authentic, progressive ideals.",
      "Strategic Advancement: A call to ground your inspiration into method. Inspiration needs a practical plan. This is about transforming visionary ideas into actionable steps and methodical execution to achieve tangible results.",
    ],
    baseElement: "Earth",
    planetInternalInfluence: "Uranus – revolution, innovation, and personal awakening.",
    astrologyExternalDomain: "Aquarius – humanitarian focus, idealism, breaking tradition.",
    iconSymbol: "Direction Arrows",
    orientation: "Shaft First",
    sacredGeometry: "Ladder",
    synergisticElement: "Air",
  },
  {
    id: "5-Sword",
    number: "5",
    suit: "Sword",
    fullTitle: "5 Sword - The Sword of Power and Conflict",
    symbols: [
      { key: "Number", value: "5" },
      { key: "Suit", value: "Sword" },
      { key: "Element (Base)", value: "Earth" },
      { key: "Planet (Internal Influence)", value: "Mercury – communication, mental sharpness, adaptability." },
      {
        key: "Astrology (External Domain)",
        value: "Gemini – dual perspectives, clever problem solving, sharp intellect.",
      },
      { key: "Icon", value: "Delta" },
      { key: "Orientation", value: "Edge First" },
      { key: "Sacred Geometry", value: "Fivefold Circles" },
      { key: "Synergistic Element", value: "Water" },
    ],
    symbolismBreakdown: [
      "Number: 5 - Change, challenge, the turning point that provokes growth. Represents instability, conflict, and the disruption of equilibrium, often leading to necessary adjustments and a dynamic shift in understanding or circumstances.",
      "Suit (Sword): Conveys precision, cutting through illusion or stagnation. In the context of 5, the sword highlights mental conflict, debates, or the harsh clarity that can arise from difficult truths or disagreements.",
      "Icon (Delta): A symbol of forceful change and active transformation. The Delta here underscores the dynamic and often abrupt nature of the change indicated by the number 5, a gateway to a new state often passed through challenge.",
      "Orientation (Edge First): Reflects initiating movement through force, often in conflict. The sword's edge leading implies a confrontational stance, a willingness to cut ties, or to assert oneself in a challenging situation, potentially creating friction.",
      "Sacred Geometry (Fivefold Circles): Represents harmony in chaos—balance through multiplicity. Fivefold geometry (like a pentagram or patterns of five) often symbolizes the human form or dynamic balance. Here, it suggests that even within conflict or multiplicity, an underlying order or potential for new harmony exists.",
      "Planet (Mercury): Speaks to swift action, persuasion, and agility. Mercury's influence brings quick thinking, articulate communication (or miscommunication leading to conflict), and the mental dexterity to navigate complex or challenging discussions.",
      "Astrology (Gemini): External engagement through mental versatility and charm. Gemini explores duality, excels at debate, and can see multiple sides of an issue, which can either fuel conflict through argument or resolve it through clever negotiation.",
      "Synergistic Element (Water): Water tempers the sword's force with adaptability and flow, enabling flexible strategy and emotional resilience in the heat of confrontation. It suggests that navigating conflict successfully requires not just sharp intellect but also emotional understanding and the ability to adapt.",
    ],
    keyMeanings: [
      "Power Through Speech: A situation may demand clarity, assertion, or confrontation. This is a call to use your words carefully but decisively, to speak your truth, or to engage in necessary discussions even if they are difficult.",
      "Conflict as Catalyst: Tension can lead to needed movement. Disagreements or challenges, while uncomfortable, often highlight areas that require change, forcing new perspectives and ultimately paving the way for progress.",
      "Mental Dexterity: Use adaptability and cleverness to handle resistance. This advises approaching challenges with a flexible mind, being resourceful, and using wit and strategic thinking to overcome obstacles or opposition.",
      "Sharp Direction: Know when to cut ties or move forward with bold clarity. Sometimes, resolution requires decisive action, such as ending a situation that is no longer tenable or making a clear choice to pursue a new path, even if it's difficult.",
    ],
    baseElement: "Earth",
    planetInternalInfluence: "Mercury – communication, mental sharpness, adaptability.",
    astrologyExternalDomain: "Gemini – dual perspectives, clever problem solving, sharp intellect.",
    iconSymbol: "Delta",
    orientation: "Edge First",
    sacredGeometry: "Fivefold Circles",
    synergisticElement: "Water",
  },
  {
    id: "6-Stone",
    number: "6",
    suit: "Stone",
    fullTitle: "6 Stone - The Stone of Foundation and Ritual",
    symbols: [
      { key: "Number", value: "6" },
      { key: "Suit", value: "Stone" },
      { key: "Element (Base)", value: "Earth" },
      { key: "Planet (Internal Influence)", value: "Venus – beauty, receptivity, and sensual expression." },
      { key: "Astrology (External Domain)", value: "Taurus – comfort, stability, and persistent building." },
      { key: "Icon", value: "Pentagon" },
      { key: "Orientation", value: "Rough Side" },
      { key: "Sacred Geometry", value: "Spiral" },
      { key: "Synergistic Element", value: "Earth" },
    ],
    symbolismBreakdown: [
      "Number: 6 – Harmony through repetition, balance, and organic growth. Represents reciprocity, community, family, and the beauty found in established rhythms and mutual support. It seeks equilibrium and peaceful coexistence.",
      "Suit (Stone): The material realm, the body, rituals, earth's memory. Stone signifies solidity, endurance, ancient wisdom, and the tangible world. It connects to foundations, traditions, and physical well-being.",
      "Icon (Pentagon): Symbolizes the human form and the material temple. The pentagon, with its five points, often represents the microcosm of the human body or the harmonious integration of elements within a sacred, tangible space.",
      "Orientation (Rough Side): Roughness represents rawness, potential, and growth through abrasion. The unpolished side of the stone suggests that foundations are built through effort, and that initial stages may involve challenges that shape and strengthen.",
      "Sacred Geometry (Spiral): Reflects growth, cycles, and evolution through persistence. The spiral is a universal symbol of journeying, expansion from a central point, and the cyclical nature of life, indicating continuous development and deepening understanding.",
      "Planet (Venus): Brings beauty, receptivity, and sensual expression. Venus fosters love, harmony, appreciation for aesthetics, and a connection to the physical senses, encouraging the creation of a pleasant and nurturing environment.",
      "Astrology (Taurus): Externalizes comfort, stability, and persistent building. Taurus seeks security in the material world, values dependability, and works steadily to create a life of comfort, beauty, and lasting worth.",
      "Synergistic Element (Earth): Earth reinforces stability and grounding, deepening the bond between physical ritual and long-lasting structure. The element of Earth here amplifies the stone's qualities, emphasizing the importance of tangible practices and solid foundations for enduring well-being.",
    ],
    keyMeanings: [
      "Rituals of Becoming: Establish patterns that shape who you're becoming. This highlights the power of consistent practices and routines to build character, reinforce values, and create a supportive structure for personal growth.",
      "Sacred Groundwork: Root in what nourishes and sustains you. Identify and connect with the core elements – be they values, relationships, or practices – that provide fundamental support, stability, and a sense of belonging.",
      "Embodied Cycles: Growth takes time—trust organic rhythms. Recognize that true development unfolds naturally and often cyclically. Patience and trust in these inherent life patterns are key to sustainable progress.",
      "Earth as Teacher: The path of grounded wisdom begins in the body. Pay attention to physical sensations and the wisdom of the material world. Practical experience and connection to nature offer profound lessons.",
    ],
    baseElement: "Earth",
    planetInternalInfluence: "Venus – beauty, receptivity, and sensual expression.",
    astrologyExternalDomain: "Taurus – comfort, stability, and persistent building.",
    iconSymbol: "Pentagon",
    orientation: "Rough Side",
    sacredGeometry: "Spiral",
    synergisticElement: "Earth",
  },
  {
    id: "7-Spear",
    number: "7",
    suit: "Spear",
    fullTitle: "7 Spear – The Spear of Intuition and Service",
    symbols: [
      { key: "Number", value: "7" },
      { key: "Suit", value: "Spear" },
      { key: "Element (Base)", value: "Air" },
      {
        key: "Planet (Internal Influence)",
        value: "Neptune – dreamlike guidance, spiritual defense, and inner clarity.",
      },
      {
        key: "Astrology (External Domain)",
        value: "Pisces – empathy-driven service, defending those unseen, romantic sensitivity.",
      },
      { key: "Icon", value: "Direction Arrows" },
      { key: "Orientation", value: "Point First" },
      { key: "Sacred Geometry", value: "Chevron" },
      { key: "Synergistic Element", value: "Air" },
    ],
    symbolismBreakdown: [
      "Number: 7 – Mystery, inner knowledge, spiritual vision. Represents introspection, analysis, wisdom gained through solitude, and the quest for deeper understanding beyond the mundane. It often signifies a spiritual or intellectual breakthrough.",
      "Suit (Spear): Symbol of proactive force and chosen direction. In the context of 7, the spear's aim is guided by inner wisdom and intuitive insights, directing focused action towards a higher purpose or a more spiritual goal.",
      "Icon (Direction Arrows): Suggests attunement to inner guidance through movement. The arrows here point towards a path revealed by intuition, indicating that action should follow the subtle cues and internal compass.",
      "Orientation (Point First): Directs action guided by feeling and subtle knowing. The spear is aimed with precision, but that precision comes from a deep, intuitive sense of rightness rather than purely logical deduction.",
      "Sacred Geometry (Chevron): Represents directional clarity and sacred alignment. The chevron (V-shape) is a strong directional marker, often symbolizing a path, a gateway, or a focused movement upwards or forwards, in alignment with a higher principle.",
      "Planet (Neptune): Connects you to subtle truths and intuitive flow. Neptune dissolves boundaries, enhances imagination, and opens channels to psychic awareness, dreams, and spiritual inspiration, guiding through feeling and visionary insight.",
      "Astrology (Pisces): Brings empathy, receptivity, and imagination to the external journey. Pisces navigates the world with profound compassion, artistic sensitivity, and a connection to the collective unconscious, often serving others through intuitive understanding.",
      "Synergistic Element (Air): Air inspires the spear's focus with creative insight and expansiveness, facilitating clear communication and intellectual agility in acts of service. Air provides the mental clarity and articulate expression needed to translate intuitive insights into understandable concepts and effective, helpful actions.",
    ],
    keyMeanings: [
      "Guided Service: Let higher intuition shape your efforts. Allow your inner wisdom, dreams, and spiritual insights to direct how you help others or pursue your goals, trusting the subtle guidance you receive.",
      "Inspired Defenses: Protecting others may require imagination and sensitivity. When defending a cause or individuals, employ not just strength but also empathy, creative problem-solving, and an intuitive understanding of the unseen dynamics at play.",
      "Spiritual Targeting: Aim your will at what only you can see. Direct your focus and efforts towards goals or truths that are revealed through your unique intuitive perception, even if they are not yet apparent to others.",
      "Fluid Precision: Act on subtle truths with clarity and compassion. Combine the sharpness of insight with a gentle, understanding approach. This means being decisive when intuition is clear, yet always acting with kindness and empathy.",
    ],
    baseElement: "Air",
    planetInternalInfluence: "Neptune – dreamlike guidance, spiritual defense, and inner clarity.",
    astrologyExternalDomain: "Pisces – empathy-driven service, defending those unseen, romantic sensitivity.",
    iconSymbol: "Direction Arrows",
    orientation: "Point First",
    sacredGeometry: "Chevron",
    synergisticElement: "Air",
  },
  {
    id: "8-Cord",
    number: "8",
    suit: "Cord",
    fullTitle: "8 Cord – The Cord of Binding and Resolution",
    symbols: [
      { key: "Number", value: "8" },
      { key: "Suit", value: "Cord" },
      { key: "Element (Base)", value: "Spirit" },
      {
        key: "Planet (Internal Influence)",
        value: "Saturn – responsibility, karmic patterns, mastery through boundaries.",
      },
      { key: "Astrology (External Domain)", value: "Capricorn – structure, long-term goals, integrity." },
      { key: "Icon", value: "Hourglass" },
      { key: "Orientation", value: "Knot Away" },
      { key: "Sacred Geometry", value: "Infinity Symbol" },
      { key: "Synergistic Element", value: "Spirit" },
    ],
    symbolismBreakdown: [
      "Number: 8 – Karmic return, balance of effort, cycles of resolution. Represents cause and effect, power, abundance, and the balancing of material and spiritual realms. It often signifies the consequences of past actions coming to fruition.",
      "Suit (Cord): Represents connections, bonds, and energetic ties. In the context of 8, the cord can symbolize commitments, contracts, or energetic links that are now up for review, resolution, or the realization of their long-term implications.",
      "Icon (Hourglass): Symbolizes obligations, contracts, or fate-bound energies. The hourglass signifies something firmly established or an entanglement. Depending on context, it could be a secure bond or a complex issue needing to be untied or resolved.",
      'Orientation (Knot Away): Something may be sealed, finished, or removed from current influence. Tying a knot "away" suggests a deliberate act of concluding, securing an outcome, or releasing something by finalizing its form or connection.',
      "Sacred Geometry (Infinity Symbol): Represents eternal return, looping timelines, or continuous connection. The infinity symbol (lemniscate) highlights cycles, endlessness, and the interconnectedness of all things, suggesting that resolutions often lead to new beginnings within a larger pattern.",
      "Planet (Saturn): Speaks to long-term structure, karmic duty, and life's harder lessons. Saturn brings discipline, responsibility, and the wisdom gained through facing limitations and fulfilling obligations. It encourages mastery and integrity.",
      "Astrology (Capricorn): Grounded ambition, duty, and achievement. Capricorn strives for tangible accomplishments through hard work, strategic planning, and a strong sense of responsibility, often building enduring structures.",
      "Synergistic Element (Spirit): Spirit weaves through bonds, elevating connections beyond the material to reveal karmic lessons and soul-level integration. Spirit infuses the practical and material aspects with higher purpose, helping to understand the deeper meaning behind commitments and resolutions.",
    ],
    keyMeanings: [
      "Closure and Finality: Tied energy has reached its endpoint. A cycle of effort, a relationship, or a particular obligation is coming to a definitive conclusion, and its results are becoming clear.",
      "Sacred Obligation: A contract must be honored—or ended with care. This refers to commitments, whether spoken or unspoken, that require fulfillment or a conscious, respectful process of dissolution if they are no longer serving their purpose.",
      "Mastery Through Boundaries: Limits clarify power. Understanding and working within defined structures and responsibilities can lead to greater focus, efficiency, and the development of true capability and strength.",
      "Fated Resolution: Karmic threads are being woven or cut. Events unfold that seem destined, bringing resolution to long-standing issues or patterns, often reflecting the natural consequences of past actions and choices.",
    ],
    baseElement: "Spirit",
    planetInternalInfluence: "Saturn – responsibility, karmic patterns, mastery through boundaries.",
    astrologyExternalDomain: "Capricorn – structure, long-term goals, integrity.",
    iconSymbol: "Hourglass",
    orientation: "Knot Away",
    sacredGeometry: "Infinity Symbol",
    synergisticElement: "Spirit",
  },
  {
    id: "9-Stone",
    number: "9",
    suit: "Stone",
    fullTitle: "9 Stone - The Stone of Witness and Completion",
    symbols: [
      { key: "Number", value: "9" },
      { key: "Suit", value: "Stone" },
      { key: "Element (Base)", value: "Air" },
      { key: "Planet (Internal Influence)", value: "Mars – assertion, willpower, protection." },
      {
        key: "Astrology (External Domain)",
        value: "Aries – courageous movement, initiating closure, leading through resolve.",
      },
      { key: "Icon", value: "Pentagon" },
      { key: "Orientation", value: "Smooth Side" },
      { key: "Sacred Geometry", value: "Eye" },
      { key: "Synergistic Element", value: "Earth" },
    ],
    symbolismBreakdown: [
      "Number: 9 – Completion, spiritual wisdom, closure. Represents the culmination of a cycle, attainment, humanitarianism, and the wisdom gained from a full spectrum of experiences. It is a prelude to a new beginning.",
      "Suit (Stone): The physical, ritual witness, the stone of remembrance. The stone here acts as a monument to what has been experienced and learned, a tangible marker of the journey's end and the wisdom consolidated.",
      "Icon (Pentagon): The pentagon represents watchful presence and inner vision, symbolizing the power of sacred attention to bear witness to endings and new beginnings. It implies clear perception, wisdom, and impartial observation.",
      "Orientation (Smooth Side): Completion and ease—what has been shaped can now be released. The polished side of the stone indicates that the work is done, the lessons learned, and there's a sense of peace and fulfillment in the accomplishment.",
      "Sacred Geometry (Eye): Symbol of clear knowing, sacred witness, and divine attention. The Eye of Providence or the inner eye signifies enlightenment, spiritual awareness, and the ability to see things as they truly are, with profound understanding.",
      "Planet (Mars): Brings energy to assert finality or protection. Mars provides the courage and drive to definitively conclude matters, protect the wisdom gained, and make any necessary assertive moves to ensure a clean ending.",
      "Astrology (Aries): Direct action, courage, and leadership in ending cycles. Aries initiates with boldness. In the context of 9, this energy is applied to courageously finalize a chapter, leading the way towards resolution and preparing for new ventures.",
      "Synergistic Element (Earth): Where Air unveils patterns and possibilities, Earth gives those patterns substance—turning vision into ritual, ideas into foundations, and fleeting clarity into enduring wisdom. Earth grounds the insights (Air) into tangible, lasting understanding and solidifies the completion.",
    ],
    keyMeanings: [
      "Completion With Honor: What was built can now be let go. Acknowledge accomplishments and the end of a significant phase with grace and integrity, releasing attachments to allow for future growth.",
      "Witness to the Journey: Acknowledge what has been seen and learned. Reflect upon the entire cycle, integrating the lessons and insights gained. This is a time for deep understanding and acceptance of the path traveled.",
      "Spiritual Protection: Guard sacred truths and endings. Preserve the wisdom acquired and ensure that the closure process is respected, protecting the sanctity of what has been completed from negativity or disruption.",
      "Release With Awareness: Let go, but let it teach you. Consciously release people, situations, or beliefs that are part of the concluding cycle, doing so with an understanding of their role in your growth and carrying the lessons forward.",
    ],
    baseElement: "Air",
    planetInternalInfluence: "Mars – assertion, willpower, protection.",
    astrologyExternalDomain: "Aries – courageous movement, initiating closure, leading through resolve.",
    iconSymbol: "Pentagon",
    orientation: "Smooth Side",
    sacredGeometry: "Eye",
    synergisticElement: "Earth",
  },
]

export function CardSimulator() {
  const [selectedCards, setSelectedCards] = useState<OracleCard[]>([])
  const [question, setQuestion] = useState("")
  const [fullName, setFullName] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")
  const [hasConsent, setHasConsent] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [cardsWithImages, setCardsWithImages] = useState<OracleCard[]>([])
  const [imageLoadingProgress, setImageLoadingProgress] = useState(0)
  const [imageLoadingStats, setImageLoadingStats] = useState<{
    loaded: number
    total: number
    failed: number
    isLoading: boolean
  }>({ loaded: 0, total: 0, failed: 0, isLoading: false })
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline" | "slow">("online")
  const [assistantReading, setAssistantReading] = useState("")
  const [conversationThreadId, setConversationThreadId] = useState<string>("")
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [showAssistantChat, setShowAssistantChat] = useState(false)
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")

  // Load card images from blob storage
  useEffect(() => {
    const loadCardImages = async () => {
      setIsLoadingImages(true)
      setImageLoadingStats({ loaded: 0, total: masterCardData.length, failed: 0, isLoading: true })

      try {
        // Check network status
        const startTime = Date.now()

        const cardsWithBlobImages = await Promise.all(
          masterCardData.map(async (card, index) => {
            try {
              // Try to get image for base element first, then synergistic element
              let imagePath = await getCardImageUrl(card.id, card.baseElement)

              // If base element image not found, try synergistic element
              if (imagePath.includes("placeholder.svg")) {
                imagePath = await getCardImageUrl(card.id, card.synergisticElement)
              }

              // Update progress
              const loaded = index + 1
              setImageLoadingProgress((loaded / masterCardData.length) * 100)
              setImageLoadingStats((prev) => ({ ...prev, loaded }))

              return {
                ...card,
                imagePath,
              }
            } catch (error) {
              console.error(`Error loading image for card ${card.id}:`, error)
              setImageLoadingStats((prev) => ({ ...prev, failed: prev.failed + 1 }))

              return {
                ...card,
                imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
              }
            }
          }),
        )

        setCardsWithImages(cardsWithBlobImages)

        // Enhanced preloading with progress tracking
        const cardIds = masterCardData.map((card) => card.id)
        const elements = [...new Set(masterCardData.flatMap((card) => [card.baseElement, card.synergisticElement]))]

        const preloadResults = await preloadCardImages(cardIds, elements, (loaded, total) => {
          setImageLoadingProgress((loaded / total) * 100)
        })

        // Determine network status based on load time
        const totalTime = Date.now() - startTime
        if (totalTime > 10000) {
          setNetworkStatus("slow")
        } else if (preloadResults.failed > preloadResults.loaded * 0.5) {
          setNetworkStatus("offline")
        } else {
          setNetworkStatus("online")
        }

        console.log(
          `Image loading completed: ${preloadResults.loaded} loaded, ${preloadResults.failed} failed in ${preloadResults.totalTime}ms`,
        )
      } catch (error) {
        console.error("Error loading card images:", error)
        setNetworkStatus("offline")
        // Fallback to original data with placeholder paths
        setCardsWithImages(
          masterCardData.map((card) => ({
            ...card,
            imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
          })),
        )
      } finally {
        setIsLoadingImages(false)
        setImageLoadingStats((prev) => ({ ...prev, isLoading: false }))
      }
    }

    loadCardImages()
  }, [])

  // Load user data on component mount
  useEffect(() => {
    const consent = userDataService.hasConsent()
    setHasConsent(consent)

    if (consent) {
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setFullName(profile.fullName || "")
        setSpreadType(profile.preferredSpread || "single")
      }
    }
  }, [])

  // Save user data when form changes
  useEffect(() => {
    if (hasConsent && (fullName || spreadType !== "single" || birthPlace)) {
      const profileData: Partial<UserProfile> = {}

      if (fullName) profileData.fullName = fullName
      if (spreadType !== "single") profileData.preferredSpread = spreadType
      // Note: birthPlace would need to be added to UserProfile interface if you want to persist it

      userDataService.saveUserProfile(profileData)
    }
  }, [fullName, spreadType, birthPlace, hasConsent])

  // Memoize handleConsentChange
  const handleConsentChange = useCallback((consent: boolean) => {
    setHasConsent(consent)

    if (consent) {
      // Load existing data if available
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setFullName(profile.fullName || "")
        setSpreadType(profile.preferredSpread || "single")
      }
    } else {
      // Clear form data when consent is withdrawn
      setUserProfile(null)
      setFullName("")
      setSpreadType("single")
      setBirthPlace("")
    }
  }, []) // Empty dependency array means this function is created once

  const shuffleCards = async () => {
    setIsShuffling(true)

    // Update last used timestamp
    if (hasConsent) {
      userDataService.updateLastUsed()
    }

    // Simulate shuffling animation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
    const shuffled = [...cardsWithImages].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numCards)

    setSelectedCards(selected)
    generateReading(selected)
    setIsShuffling(false)
  }

  // Enhanced reading generation using ChatGPT Assistant
  const generateReading = async (cards: OracleCard[]) => {
    setIsGeneratingReading(true)

    try {
      // Call the complete reading API
      const response = await fetch("/api/generateCompleteReading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          dateOfBirth: birthDate,
          timeOfBirth: birthTime,
          birthPlace: birthPlace,
          question: question,
          selectedCards: cards,
          spreadType: spreadType,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setConversationThreadId(data.threadId)

        if (data.content && data.content.trim()) {
          setAssistantReading(data.content)
          setReading(data.content)
        } else {
          // Fallback to original reading generation
          generateFallbackReading(cards)
        }
      } else {
        console.warn("AI reading generation failed:", data.error)
        generateFallbackReading(cards)
      }
    } catch (error) {
      console.error("Error generating AI reading:", error)
      // Fallback to the original reading generation
      generateFallbackReading(cards)
    } finally {
      setIsGeneratingReading(false)
    }
  }

  // Fallback reading generation (original method)
  const generateFallbackReading = (cards: OracleCard[]) => {
    // ... (keep the existing generateReading logic as fallback)
    const personalizedGreeting = fullName ? `Dear ${fullName.split(" ")[0]}, your` : "Your"

    let readingText = `${personalizedGreeting} reading reveals:\n\n`

    cards.forEach((card, index) => {
      readingText += `Card ${index + 1}: ${card.fullTitle}\n`
      readingText += `Elements: ${card.baseElement} ⚡ ${card.synergisticElement}\n`
      readingText += `Sacred Geometry: ${card.sacredGeometry} | Icon: ${card.iconSymbol}\n`
      readingText += `Orientation: ${card.orientation}\n\n`

      // Add a random key meaning for variety
      const randomMeaning = card.keyMeanings[Math.floor(Math.random() * card.keyMeanings.length)]
      readingText += `${randomMeaning}\n\n`

      // Add planetary and astrological influences
      readingText += `Internal Influence: ${card.planetInternalInfluence}\n`
      readingText += `External Domain: ${card.astrologyExternalDomain}\n`

      if (index < cards.length - 1) {
        readingText += "\n---\n\n"
      }
    })

    // Enhanced conclusion based on elemental analysis
    const elements = cards.flatMap((card) => [card.baseElement, card.synergisticElement])
    const elementCounts = elements.reduce(
      (acc, element) => {
        acc[element] = (acc[element] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const dominantElement = Object.entries(elementCounts).sort(([, a], [, b]) => b - a)[0]?.[0]

    readingText += `\n\nElemental Analysis: Your reading is strongly influenced by ${dominantElement}, suggesting themes of `

    switch (dominantElement) {
      case "Fire":
        readingText += "passion, action, and creative manifestation."
        break
      case "Water":
        readingText += "emotion, intuition, and flowing adaptation."
        break
      case "Air":
        readingText += "thought, communication, and mental clarity."
        break
      case "Earth":
        readingText += "stability, grounding, and practical manifestation."
        break
      case "Spirit":
        readingText += "transcendence, divine connection, and spiritual awakening."
        break
      default:
        readingText += "balanced elemental energies working in harmony."
    }

    // Add spread-specific guidance
    if (spreadType === "single") {
      readingText +=
        "\n\nThis single card illuminates the core energy present in your situation. Meditate on its sacred geometry and orientation to understand how to work with this energy."
    } else if (spreadType === "three") {
      readingText +=
        "\n\nThese three cards form a trinity of guidance: past influences, present moment, and emerging future. Notice how their orientations and elements interact to tell your story."
    } else {
      readingText +=
        "\n\nThis five-card elemental spread reveals the full spectrum of forces at work. Each card's orientation and sacred geometry offers specific guidance for navigating your path."
    }

    setReading(readingText)
  }

  const saveReading = () => {
    if (!question.trim()) {
      alert("Please enter a question before saving your reading.")
      return
    }

    const readingData = {
      id: `reading-${Date.now()}`,
      question,
      cards: selectedCards,
      reading,
      spreadType,
      fullName,
      birthPlace,
      date: new Date().toISOString(),
      isFavorite: false,
    }

    try {
      if (typeof window !== "undefined") {
        const existingReadings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
        existingReadings.push(readingData)
        localStorage.setItem("numoReadings", JSON.stringify(existingReadings))
        alert("Reading saved successfully!")
      }
    } catch (error) {
      console.error("Error saving reading:", error)
      alert("Failed to save reading. Please try again.")
    }
  }

  const shareReading = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "My NUMO Oracle Reading",
          text: `Question: ${question}\n\n${reading}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      // Fallback to clipboard
      const shareText = `My NUMO Oracle Reading\n\nQuestion: ${question}\n\n${reading}`
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
        alert("Reading copied to clipboard!")
      }
    }
  }

  // Component for detailed card information
  const CardDetailModal = ({ card }: { card: OracleCard }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-2">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{card.fullTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Card Image and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border">
              <Image
                src={card.imagePath || "/placeholder.svg"}
                alt={card.fullTitle}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline">Number: {card.number}</Badge>
                <Badge variant="outline">Suit: {card.suit}</Badge>
                <Badge variant="outline">Base: {card.baseElement}</Badge>
                <Badge variant="outline">Synergistic: {card.synergisticElement}</Badge>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Icon:</strong> {card.iconSymbol}
                </p>
                <p>
                  <strong>Orientation:</strong> {card.orientation}
                </p>
                <p>
                  <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                </p>
              </div>
            </div>
          </div>

          {/* Symbols */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Symbols</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {card.symbols.map((symbol, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <strong>{symbol.key}:</strong> {symbol.value}
                </div>
              ))}
            </div>
          </div>

          {/* Key Meanings */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Meanings</h3>
            <div className="space-y-3">
              {card.keyMeanings.map((meaning, index) => (
                <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm">{meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Symbolism Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Symbolism Breakdown</h3>
            <Accordion type="single" collapsible>
              {card.symbolismBreakdown.map((breakdown, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{breakdown.split(":")[0]}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {breakdown.split(":").slice(1).join(":").trim()}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Privacy Notice */}
      <PrivacyNotice
        title="Card Simulator Privacy"
        description="This tool can optionally remember your name and preferences to personalize your readings."
        onConsentChange={handleConsentChange}
        storageKey="cardSimulatorConsent"
        features={[
          "Save your name for personalized readings",
          "Remember your preferred spread type",
          "Track usage for better experience",
          "Store birth information for astrological insights",
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          NUMO Oracle Card Simulator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Experience the wisdom of the Five Sacred Treasures through digital divination
        </p>

        {/* Network Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm">
          {networkStatus === "online" ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : networkStatus === "slow" ? (
            <Wifi className="h-4 w-4 text-yellow-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-gray-500">
            {networkStatus === "online" ? "Connected" : networkStatus === "slow" ? "Slow Connection" : "Offline Mode"}
          </span>
        </div>
      </div>

      {/* Image Loading Progress */}
      {isLoadingImages && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Loading Card Images...</h3>
                <span className="text-sm text-gray-500">
                  {imageLoadingStats.loaded}/{imageLoadingStats.total}
                  {imageLoadingStats.failed > 0 && ` (${imageLoadingStats.failed} failed)`}
                </span>
              </div>
              <Progress value={imageLoadingProgress} className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Preparing your mystical experience...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Reading Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Your Name (Optional)</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name for personalized readings"
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save your name</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth (Optional)</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime">Time of Birth (Optional)</Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                disabled={!hasConsent}
                placeholder="HH:MM"
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth (Optional)</Label>
              <Input
                id="birthPlace"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="City, Country"
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What guidance do you seek from the Oracle?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Spread Type</Label>
            <Tabs value={spreadType} onValueChange={setSpreadType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="single">Single Card</TabsTrigger>
                <TabsTrigger value="three">Three Cards</TabsTrigger>
                <TabsTrigger value="five">Five Elements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Shuffle Button */}
      <div className="text-center">
        <Button
          onClick={shuffleCards}
          disabled={isShuffling || isLoadingImages}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isShuffling ? (
            <>
              <Shuffle className="mr-2 h-5 w-5 animate-spin" />
              Shuffling the Sacred Deck...
            </>
          ) : (
            <>
              <Shuffle className="mr-2 h-5 w-5" />
              Draw Your Cards
            </>
          )}
        </Button>
      </div>

      {/* Selected Cards */}
      {selectedCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Sacred Cards</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetailedView(!showDetailedView)}>
                  {showDetailedView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showDetailedView ? "Simple View" : "Detailed View"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`grid gap-6 ${selectedCards.length === 1 ? "grid-cols-1 max-w-md mx-auto" : selectedCards.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}
            >
              {selectedCards.map((card, index) => (
                <div key={card.id} className="space-y-4">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border shadow-lg">
                    <Image
                      src={card.imagePath || "/placeholder.svg"}
                      alt={card.fullTitle}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                      }}
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">{card.fullTitle}</h3>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Badge variant="secondary">{card.baseElement}</Badge>
                      <Badge variant="outline">{card.synergisticElement}</Badge>
                    </div>
                    {showDetailedView && (
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                        </p>
                        <p>
                          <strong>Orientation:</strong> {card.orientation}
                        </p>
                        <p>
                          <strong>Icon:</strong> {card.iconSymbol}
                        </p>
                      </div>
                    )}
                    <CardDetailModal card={card} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reading Display */}
      {(reading || isGeneratingReading) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Oracle Reading</span>
              <div className="flex gap-2">
                {conversationThreadId && (
                  <Button variant="outline" size="sm" onClick={() => setShowAssistantChat(true)}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Ask Follow-up
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={saveReading} disabled={!reading}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={shareReading} disabled={!reading}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isGeneratingReading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
                  <p className="text-lg font-medium">Consulting the Oracle...</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The sacred wisdom is being channeled through the digital realm
                  </p>
                </div>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">{reading}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Assistant Chat Modal */}
      {showAssistantChat && conversationThreadId && (
        <Dialog open={showAssistantChat} onOpenChange={setShowAssistantChat}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Continue Your Reading</DialogTitle>
            </DialogHeader>
            <AssistantChat
              threadId={conversationThreadId}
              context={{
                fullName,
                question,
                selectedCards,
                reading: assistantReading,
                spreadType,
                birthDate,
                birthTime,
                birthPlace,
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Usage Statistics (if consent given) */}
      {hasConsent && userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Your Oracle Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{userProfile.readingsCount || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Readings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{userProfile.preferredSpread || "Single"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Spread</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {userProfile.lastUsed ? new Date(userProfile.lastUsed).toLocaleDateString() : "Today"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Reading</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {userProfile.createdAt
                    ? Math.floor((Date.now() - new Date(userProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                    : 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            How to Use the Oracle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="font-semibold">Set Your Intention</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your question and personal details for a more personalized reading
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold">Choose Your Spread</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select single card for focus, three cards for past-present-future, or five for elemental balance
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold">Receive Guidance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Draw your cards and receive personalized insights from the Oracle
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
