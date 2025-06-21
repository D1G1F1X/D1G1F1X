import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Card Meanings",
  description: "Detailed symbolic meanings for each primary card in the NUMO Oracle Deck.",
}

export default function CardMeaningsPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">The Cards & Their </span>
          <span className="text-purple-400">Meanings</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Detailed symbolic meanings for each of the primary cards in the NUMO Oracle Deck.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/philosophy">NUMO System Philosophy</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/elemental-layers">Interpreting Elemental Layers</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            This chapter provides the detailed symbolic meanings for each of the primary cards in the NUMOracle Deck.
            Each entry synthesizes the card's foundational numerology, astrology, and elemental power. Click on any card
            title to expand its details.
          </p>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-0-cauldron" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.1: 0 Cauldron – The Cauldron of Creation
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 0 Cauldron card, paired with the 1 Cauldron, represents the first Gift of Danu, the Cauldron of
                Creation. It embodies the number of infinite potential and the unmanifest void. This card is ruled by
                the transformative power of <strong className="text-text-heading">Pluto</strong> and the deep, mystical
                cycles of <strong className="text-text-heading">Scorpio</strong>. Its core message is about the
                alchemical process of creation that happens in the unseen depths, before anything becomes tangible.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 0
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Cauldron
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Spirit
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Pluto – deep
                  transformation, inner renewal, and hidden power.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Scorpio – cycles of death
                  and rebirth, secrets, intensity.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Pentagram
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Cooking
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Dot
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Fire
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 0</strong> – Symbol of unmanifest potential—the infinite
                  womb of all creation, representing the void from which all possibilities emerge.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Cauldron):</strong> In its cooking orientation, the
                  cauldron stews possibility into reality, slowly combining all elements into creation in a gentle,
                  alchemical process.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Pentagram):</strong> Represents balance of the five
                  elements, symbolizing integration, protection, and harmony with the cosmos.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Cooking):</strong> Indicates that the creation is
                  in progress, highlighting a phase of internal development and careful preparation.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Dot):</strong> The spark of origin—the first
                  point from which all things emerge. It is the singularity, the concentrated seed of potential.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Pluto):</strong> Deep, transformative forces working
                  behind the scenes. Pluto governs the subconscious, dismantling old structures and facilitating
                  regeneration.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Scorpio):</strong> Reflects external themes of
                  rebirth, secrecy, and shedding of old layers, leading to profound healing and empowerment.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Fire):</strong> The combustion of Spirit
                  and Water—the ignition of creation and passion. Fire is the activating principle that turns
                  inspiration into manifestation.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Creation in Progress:</strong> Energy is stirring, but not yet
                  ready to emerge. A nascent stage requiring further nurturing.
                </li>
                <li>
                  <strong className="text-text-heading">Alchemy and Transformation:</strong> Inner metamorphosis is
                  occurring beneath the surface, pointing to profound internal shifts and healing.
                </li>
                <li>
                  <strong className="text-text-heading">Infinite Potential:</strong> Anything is possible, but it must
                  go through the fire of a necessary trial or purification.
                </li>
                <li>
                  <strong className="text-text-heading">Inner Depths:</strong> The process requires patience and
                  surrender to unseen forces, trusting the natural unfolding.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-1-cauldron" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.2: 1 Cauldron – The Cauldron of Manifestation
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 1 Cauldron is the dynamic counterpart to the 0. It represents the number of individuality, action,
                and the first step of manifestation. This card is ruled by the brilliant and life-giving{" "}
                <strong className="text-text-heading">Sun</strong> and the proud, expressive energy of{" "}
                <strong className="text-text-heading">Leo</strong>. Where the 0 was potential, the 1 is performance; it
                is the moment the contents of the Cauldron are poured forth into the world with confidence and creative
                power.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 1
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Cauldron
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Fire
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Sun – creative force,
                  willpower, and illumination.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Leo – pride in expression,
                  creative passion, dramatic emergence.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Pentagram
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Pouring
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Plus Sign
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Fire
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 1</strong> – The number of individuality and
                  manifestation—initiation of purpose. It represents the first step, originality, and the power of
                  focused will.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Cauldron):</strong> Pouring forth its contents—the
                  creation is emerging. The vessel now actively releases what has been brewing, an act of giving and
                  outward expression.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Pentagram):</strong> Balanced elemental structure driving
                  harmonious emergence. The integrated elements provide a stable foundation for the creative output.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Pouring):</strong> Indicates readiness to
                  act—release of the creation. A conscious decision to move from internal preparation to external
                  action.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Plus Sign):</strong> The crossroads of action
                  and potential—energy merging. The plus sign represents the intersection of different planes or
                  energies.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Sun):</strong> Drives inner willpower and identity into
                  radiance. The Sun provides vitality, confidence, and clarity of purpose.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Leo):</strong> External stage—performance,
                  confidence, leadership. Leo embodies the joy of self-expression and the courage to take center stage.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Fire):</strong> Fire and Spirit igniting
                  the fires of birth and radiant will. Highlights pure, active, and enthusiastic energy that fuels
                  manifestation.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Manifestation in Motion:</strong> Pour your energy into the
                  world. A call to take deliberate action and share your unique contributions.
                </li>
                <li>
                  <strong className="text-text-heading">Personal Power:</strong> Lead the creation with your fire.
                  Embrace your innate abilities and willpower to direct the course of your creations.
                </li>
                <li>
                  <strong className="text-text-heading">Creative Expression:</strong> Let your gifts be seen. Do not
                  hide your talents or insights. It is time to showcase what you have developed.
                </li>
                <li>
                  <strong className="text-text-heading">Action-Oriented:</strong> Time to execute what you've been
                  envisioning. Move beyond planning into the realm of doing.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-2-sword" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.3: 2 Sword – The Sword of Precision and Perception
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 2 Sword, paired with the 5 Sword, forms the Sword suit, representing the Gift of Clarity. It
                embodies the reflective, balancing energy of the number 2. Ruled by the{" "}
                <strong className="text-text-heading">Moon</strong> and the emotionally intelligent sign of{" "}
                <strong className="text-text-heading">Cancer</strong>, this card's primary domain is not logic alone,
                but perception that is deeply informed by intuition. It is about weighing choices with a blend of mental
                and emotional insight before any decisive action is taken.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 2
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Sword
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Water
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Moon – intuition,
                  reflection, inner perception.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Cancer – protection,
                  emotional depth, caregiving.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Delta
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Point First
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Vesica Piscis
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Water
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 2</strong> – Duality, balance, and reflection.
                  Represents choices, partnerships, and the need to find equilibrium between opposing forces.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Sword):</strong> The sword reflects clarity, intellect,
                  and decision-making, but here, its precision is guided by feeling as much as logic.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Delta):</strong> The Greek symbol for change—refinement
                  through separation. It signifies a doorway or a point of transition.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Point First):</strong> Focused awareness and
                  precision. The sword is ready for careful, deliberate action, guided by sharp perception.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Vesica Piscis):</strong> The divine
                  intersection—understanding through union. It symbolizes the meeting point of spirit and matter.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Moon):</strong> Reflective depth, changeability, and
                  emotional navigation. The Moon governs intuition and the subconscious.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Cancer):</strong> Emotional awareness applied to
                  outer security and nurturing. It brings a sensitive, empathetic quality to perception.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Water):</strong> Water enhances the sword's
                  clarity by infusing emotional depth into logical discernment.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Focused Awareness:</strong> Seeing clearly without reacting
                  impulsively. Using both intellect and intuition to perceive the truth.
                </li>
                <li>
                  <strong className="text-text-heading">Emotional Intelligence:</strong> Understanding one's own and
                  others' inner worlds to make better decisions.
                </li>
                <li>
                  <strong className="text-text-heading">Hesitation with Purpose:</strong> A deliberate pause to ensure
                  that any decision made is well-informed and aligned with intuitive knowing.
                </li>
                <li>
                  <strong className="text-text-heading">Mental Alignment:</strong> The mind aligning with emotional
                  intuition, leading to choices that are both sound and soulful.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-3-cord" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.4: 3 Cord – The Cord of Purpose and Time
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 3 Cord, paired with the 8 Cord, forms the Cord suit, representing the Gift of Connection to fate and
                destiny. This card embodies the creative, expansive energy of the number 3. It is ruled by the
                benevolent planet <strong className="text-text-heading">Jupiter</strong> and the philosophical sign of{" "}
                <strong className="text-text-heading">Sagittarius</strong>. It speaks of a creative cycle reaching a
                point of culmination, where the purpose of a particular life lesson or journey is about to be revealed
                and understood within the grand flow of time.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 3
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Cord
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Fire
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Jupiter – expansion,
                  purpose, trust in time.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Sagittarius –
                  truth-seeking, life journey, philosophical freedom.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Hourglass
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Knot Before
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Finite Symbol
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Spirit
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 3</strong> – Completion of a small cycle—body, mind,
                  spirit. Represents initial synthesis, creativity, and expression.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Cord):</strong> Binds, restrains, or ends that which must
                  be sealed. It symbolizes connection, commitment, or the conclusion of a phase.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Hourglass):</strong> Measures time, inevitability, and
                  clarity in limitation. It highlights cycles and deadlines.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Knot Before):</strong> Suggests the binding is
                  imminent—preparation for conclusion. Signifies commitment or a process being secured.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Finite Symbol):</strong> The edge of
                  infinity-what is bounded must resolve. Refers to a closed loop where completion is sought.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Jupiter):</strong> Inner expansion through boundaries
                  and endings. It ensures that an ending paves the way for greater understanding.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Sagittarius):</strong> External truth-seeking mission
                  concluding a cycle. A journey of discovery reaching culmination.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Spirit):</strong> As the earthly cycle
                  completes, there's an opportunity for a release of energy to a higher level.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Countdown to Release:</strong> A lesson or binding is reaching
                  its final moment, preparing for a transition.
                </li>
                <li>
                  <strong className="text-text-heading">Truth Before Binding:</strong> A need to recognize what must be
                  seen before closure, acknowledging all truths and insights.
                </li>
                <li>
                  <strong className="text-text-heading">Purpose Realized:</strong> The result of your actions must be
                  accepted. It's time to own the outcomes and learn from them.
                </li>
                <li>
                  <strong className="text-text-heading">Time's End:</strong> A cycle completes, but a journey continues
                  inward. The internal process of integration carries on.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-4-spear" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.5: 4 Spear – The Spear of Drive and Direction
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 4 Spear, paired with the 7 Spear, forms the Spear suit, the Gift of Strength and Guidance. This card
                embodies the stable, foundational energy of the number 4. It is uniquely ruled by{" "}
                <strong className="text-text-heading">Uranus</strong>, the planet of revolution, and its associated
                sign, <strong className="text-text-heading">Aquarius</strong>. This brings a fascinating tension: the
                drive to build a solid, earthly foundation (4 and Earth Base) that is simultaneously innovative,
                progressive, and geared toward a higher, humanitarian vision.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 4
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Spear
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Earth
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Uranus – revolution,
                  innovation, and personal awakening.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Aquarius – humanitarian
                  focus, idealism, breaking tradition.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Direction Arrows
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Shaft First
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Ladder
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Air
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 4</strong> – Stability, foundation, the four corners of
                  effort and space. Represents structure, order, and building something lasting.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Spear):</strong> A symbol of forward movement and
                  protection through assertion. It implies courage and a clear aim.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Direction Arrows):</strong> Symbolizes the many directions
                  our focus and purpose can take. Highlights choices in path and clear guidance.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Shaft First):</strong> Emphasizes the need to
                  develop stable momentum and a strong inner stance, signifying thorough preparation.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Ladder):</strong> Represents ascension through
                  structured effort. A symbol of step-by-step progress.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Uranus):</strong> Brings disruptive insight and personal
                  change, challenging the status quo with sudden breakthroughs.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Aquarius):</strong> Connects external breakthroughs
                  to idealistic purpose, championing progress and unconventional thinking.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Air):</strong> Air brings clarity and
                  momentum to the grounded Earth base, providing strategic thinking to propel initiatives forward.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Drive With Vision:</strong> Structured energy moving toward an
                  ideal, combining motivation with a practical plan.
                </li>
                <li>
                  <strong className="text-text-heading">Foundation for Action:</strong> Building what will carry the
                  force forward by establishing a stable base and support structures.
                </li>
                <li>
                  <strong className="text-text-heading">Revolutionary Roots:</strong> A new direction built on idealism
                  and truth, encouraging breaking from outdated norms.
                </li>
                <li>
                  <strong className="text-text-heading">Strategic Advancement:</strong> A call to ground your
                  inspiration into method, transforming visionary ideas into actionable steps.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-5-sword" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.6: 5 Sword – The Sword of Power and Conflict
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                As the counterpart to the 2 Sword, the 5 Sword represents the active, disruptive, and often
                conflict-driven energy of the number 5. It is ruled by the quick-witted planet{" "}
                <strong className="text-text-heading">Mercury</strong> and the dualistic sign of{" "}
                <strong className="text-text-heading">Gemini</strong>. This card speaks to the moment when balance is
                broken, and change must be navigated through mental sharpness, communication, and the force of ideas. It
                is the cutting edge of the Sword, used to sever ties or win a debate.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 5
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Sword
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Earth
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Mercury – communication,
                  mental sharpness, adaptability.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Gemini – dual
                  perspectives, clever problem solving, sharp intellect.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Delta
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Edge First
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Fivefold Circles
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Water
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 5</strong> – Change, challenge, the turning point that
                  provokes growth. Represents instability, conflict, and the disruption of equilibrium.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Sword):</strong> Conveys precision, cutting through
                  illusion or stagnation. In the context of 5, it highlights mental conflict, debates, and difficult
                  truths.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Delta):</strong> A symbol of forceful change and active
                  transformation, a gateway to a new state often passed through challenge.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Edge First):</strong> Reflects initiating movement
                  through force, often in conflict. Implies a confrontational stance.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Fivefold Circles):</strong> Represents harmony
                  in chaos. Suggests that even within conflict, an underlying order or potential for new harmony exists.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Mercury):</strong> Speaks to swift action, persuasion,
                  and agility, bringing quick thinking and mental dexterity.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Gemini):</strong> External engagement through mental
                  versatility. Excels at debate and can see multiple sides of an issue.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Water):</strong> Water tempers the sword's
                  force with adaptability and flow, enabling emotional resilience in confrontation.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Power Through Speech:</strong> A situation may demand clarity,
                  assertion, or confrontation. Use your words carefully but decisively.
                </li>
                <li>
                  <strong className="text-text-heading">Conflict as Catalyst:</strong> Tension can lead to needed
                  movement. Disagreements, while uncomfortable, often highlight areas that require change.
                </li>
                <li>
                  <strong className="text-text-heading">Mental Dexterity:</strong> Use adaptability and cleverness to
                  handle resistance. Approach challenges with a flexible and resourceful mind.
                </li>
                <li>
                  <strong className="text-text-heading">Sharp Direction:</strong> Know when to cut ties or move forward
                  with bold clarity. Sometimes resolution requires decisive action.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-6-stone" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.7: 6 Stone – The Stone of Foundation and Ritual
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 6 Stone, paired with the 9 Stone, forms the Stone suit, representing the Gift of Stability. This
                card embodies the harmonious, nurturing, and responsible energy of the number 6. It is ruled by{" "}
                <strong className="text-text-heading">Venus</strong>, the planet of love and beauty, and the grounded,
                sensual sign of <strong className="text-text-heading">Taurus</strong>. The 6 Stone speaks to creating
                harmony in the material world through consistent care, ritual, and an appreciation for the simple,
                sustaining beauty of life. It is the foundation of our physical and emotional well-being.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 6
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Stone
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Earth
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Venus – beauty,
                  receptivity, and embodied wisdom.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Taurus –
                  sensual-grounding, steady values, security.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Pentagon
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Rough Side
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Spiral
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Earth
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 6</strong> – Harmony through repetition, balance, and
                  organic growth. Represents reciprocity, community, family, and peaceful coexistence.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Stone):</strong> The material realm, the body, rituals,
                  earth's memory. It connects to foundations, traditions, and physical well-being.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Pentagon):</strong> Symbolizes the human form and the
                  material temple, representing the harmonious integration of elements within a sacred space.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Rough Side):</strong> Roughness represents rawness,
                  potential, and growth through abrasion. It suggests foundations are built through effort.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Spiral):</strong> Reflects growth, cycles, and
                  evolution through persistence. A universal symbol of continuous development and deepening
                  understanding.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Venus):</strong> Brings beauty, receptivity, and sensual
                  expression, encouraging the creation of a pleasant and nurturing environment.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Taurus):</strong> Externalizes comfort, stability,
                  and persistent building. It seeks security in the material world and values dependability.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Earth):</strong> Earth reinforces stability
                  and grounding, deepening the bond between physical ritual and long-lasting structure.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Rituals of Becoming:</strong> Establish patterns that shape who
                  you're becoming. The power of consistent practices to build character.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Groundwork:</strong> Root in what nourishes and sustains
                  you. Connect with core elements that provide fundamental support.
                </li>
                <li>
                  <strong className="text-text-heading">Embodied Cycles:</strong> Growth takes time—trust organic
                  rhythms. True development unfolds naturally; patience is key.
                </li>
                <li>
                  <strong className="text-text-heading">Earth as Teacher:</strong> The path of grounded wisdom begins in
                  the body. Practical experience and connection to nature offer profound lessons.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-7-spear" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.8: 7 Spear – The Spear of Intuition and Service
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 7 Spear is the mystical counterpart to the 4 Spear. It represents the introspective, spiritual, and
                mysterious energy of the number 7. Ruled by the ethereal planet{" "}
                <strong className="text-text-heading">Neptune</strong> and the compassionate sign of{" "}
                <strong className="text-text-heading">Pisces</strong>, this card is about directing one's will not
                through force, but through profound intuition, empathy, and a connection to unseen truths. It is the
                Spear aimed in service of a higher, spiritual, or compassionate cause.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 7
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Spear
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Air
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Neptune – dreamlike
                  guidance, spiritual defense, and inner clarity.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Pisces – empathy-driven
                  service, defending those unseen, romantic sensitivity.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Direction Arrows
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Point First
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Chevron
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Air
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 7</strong> – Mystery, inner knowledge, spiritual vision.
                  Represents introspection, wisdom gained through solitude, and a quest for deeper understanding.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Spear):</strong> Symbol of proactive force and chosen
                  direction. The spear's aim is guided by inner wisdom towards a higher purpose.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Direction Arrows):</strong> Suggests attunement to inner
                  guidance through movement. Action should follow subtle cues and the internal compass.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Point First):</strong> Directs action guided by
                  feeling and subtle knowing. Precision comes from a deep, intuitive sense of rightness.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Chevron):</strong> Represents directional
                  clarity and sacred alignment. A strong directional marker for a focused, upward movement.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Neptune):</strong> Connects you to subtle truths and
                  intuitive flow, dissolving boundaries and opening channels to psychic awareness.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Pisces):</strong> Brings empathy, receptivity, and
                  imagination to the external journey, serving others through intuitive understanding.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Air):</strong> Air inspires the spear's
                  focus with creative insight, facilitating clear communication and intellectual agility in acts of
                  service.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Guided Service:</strong> Let higher intuition shape your
                  efforts. Allow dreams and spiritual insights to direct how you help others.
                </li>
                <li>
                  <strong className="text-text-heading">Inspired Defenses:</strong> Protecting others may require
                  imagination and sensitivity. Employ empathy and creative problem-solving.
                </li>
                <li>
                  <strong className="text-text-heading">Spiritual Targeting:</strong> Aim your will at what only you can
                  see. Direct your focus towards goals revealed through your unique perception.
                </li>
                <li>
                  <strong className="text-text-heading">Fluid Precision:</strong> Act on subtle truths with clarity and
                  compassion. Combine sharp insight with a gentle, understanding approach.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-8-cord" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.9: 8 Cord – The Cord of Binding and Resolution
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                As the powerful counterpart to the 3 Cord, the 8 Cord embodies the energy of karmic return, mastery, and
                resolution. The number 8 is deeply connected to universal law. This card is ruled by{" "}
                <strong className="text-text-heading">Saturn</strong>, the great teacher and lord of karma, and the
                ambitious, structured sign of <strong className="text-text-heading">Capricorn</strong>. It signifies a
                point where long-term efforts culminate, debts are paid, and one must take responsibility for the
                structures they have built over time. It is the final knotting of a karmic thread.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 8
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Cord
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Spirit
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Saturn – responsibility,
                  karmic patterns, mastery through boundaries.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Capricorn – structure,
                  long-term goals, integrity.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Hourglass
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Knot Away
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Infinity Symbol
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Spirit
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 8</strong> – Karmic return, balance of effort, cycles of
                  resolution. Represents cause and effect, power, and balancing material and spiritual realms.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Cord):</strong> Represents connections, bonds, and
                  energetic ties. Symbolizes commitments or links that are now up for review or resolution.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Hourglass):</strong> Measures time, inevitability, and
                  clarity in limitation. It highlights cycles, deadlines, and the importance of using time wisely.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Knot Away):</strong> Something may be sealed,
                  finished, or removed from current influence. A deliberate act of concluding or releasing.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Infinity Loop):</strong> Represents eternal
                  return, looping timelines, or continuous connection. Highlights that resolutions often lead to new
                  beginnings.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Saturn):</strong> Speaks to long-term structure, karmic
                  duty, and life's harder lessons. It brings discipline, responsibility, and mastery.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Capricorn):</strong> Grounded ambition, duty, and
                  achievement. Strives for tangible accomplishments through hard work and strategic planning.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Spirit):</strong> Spirit weaves through
                  bonds, elevating connections beyond the material to reveal karmic lessons and soul-level integration.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Closure and Finality:</strong> Tied energy has reached its
                  endpoint. A cycle of effort or a relationship is coming to a definitive conclusion.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Obligation:</strong> A contract must be honored—or ended
                  with care. Commitments require fulfillment or a conscious dissolution.
                </li>
                <li>
                  <strong className="text-text-heading">Mastery Through Boundaries:</strong> Limits clarify power.
                  Working within defined structures can lead to greater focus and strength.
                </li>
                <li>
                  <strong className="text-text-heading">Fated Resolution:</strong> Karmic threads are being woven or
                  cut. Events unfold that seem destined, bringing resolution to long-standing issues.
                </li>
              </ul>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 id="card-9-stone" className="inline-block ml-6 text-text-heading text-2xl my-0">
                2.10: 9 Stone – The Stone of Witness and Completion
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                The 9 Stone is the culmination of the Stone suit, representing the wisdom of completion that comes from
                the number 9. It is ruled by the assertive energy of <strong className="text-text-heading">Mars</strong>{" "}
                and the pioneering spirit of <strong className="text-text-heading">Aries</strong>. This card signifies
                the final stage of a material or foundational journey. It is not just about having built something (like
                in the 6 Stone), but about having the wisdom and courage to witness its completion, protect its legacy,
                and courageously initiate the next cycle by letting go with honor.
              </p>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbols:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number:</strong> 9
                </li>
                <li>
                  <strong className="text-text-heading">Suit:</strong> Stone
                </li>
                <li>
                  <strong className="text-text-heading">Element (Base):</strong> Air
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Internal Influence):</strong> Mars – assertion,
                  willpower, protection.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (External Domain):</strong> Aries – courageous
                  movement, initiating closure, leading through resolve.
                </li>
                <li>
                  <strong className="text-text-heading">Icon:</strong> Pentagon
                </li>
                <li>
                  <strong className="text-text-heading">Orientation:</strong> Smooth Side
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry:</strong> Eye
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element:</strong> Earth
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Symbolism Breakdown:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Number: 9</strong> – Completion, spiritual wisdom, closure.
                  Represents the culmination of a cycle, attainment, and humanitarianism.
                </li>
                <li>
                  <strong className="text-text-heading">Suit (Stone):</strong> The physical, ritual witness, the stone
                  of remembrance. A tangible marker of the journey's end and the wisdom consolidated.
                </li>
                <li>
                  <strong className="text-text-heading">Icon (Pentagon):</strong> Symbolizes the human form and the
                  material temple. Represents the harmonious integration of elements in a sacred space.
                </li>
                <li>
                  <strong className="text-text-heading">Orientation (Smooth Side):</strong> Completion and ease—what has
                  been shaped can now be released. Indicates the work is done with a sense of peace.
                </li>
                <li>
                  <strong className="text-text-heading">Sacred Geometry (Eye):</strong> Symbol of clear knowing, sacred
                  witness, and divine attention. Signifies enlightenment and the ability to see things as they truly
                  are.
                </li>
                <li>
                  <strong className="text-text-heading">Planet (Mars):</strong> Brings energy to assert finality or
                  protection. Provides the courage to definitively conclude matters.
                </li>
                <li>
                  <strong className="text-text-heading">Astrology (Aries):</strong> Direct action, courage, and
                  leadership in ending cycles. Applied to courageously finalizing a chapter.
                </li>
                <li>
                  <strong className="text-text-heading">Synergistic Element (Earth):</strong> Where Air unveils
                  patterns, Earth gives them substance, grounding insights into tangible understanding.
                </li>
              </ul>
              <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">Key Meanings:</h5>
              <ul className="list-disc pl-6 text-text-main space-y-2">
                <li>
                  <strong className="text-text-heading">Completion With Honor:</strong> What was built can now be let
                  go. Acknowledge accomplishments with grace and integrity.
                </li>
                <li>
                  <strong className="text-text-heading">Witness to the Journey:</strong> Acknowledge what has been seen
                  and learned. A time for deep understanding of the path traveled.
                </li>
                <li>
                  <strong className="text-text-heading">Spiritual Protection:</strong> Guard sacred truths and endings.
                  Preserve the wisdom acquired and ensure the closure process is respected.
                </li>
                <li>
                  <strong className="text-text-heading">Release With Awareness:</strong> Let go, but let it teach you.
                  Consciously release people, situations, or beliefs, carrying the lessons forward.
                </li>
              </ul>
            </div>
          </details>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/philosophy">NUMO System Philosophy</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/elemental-layers">Interpreting Elemental Layers</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
