import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Interpreting Compound Numbers",
  description:
    "Understand the hidden influences, karmic lessons, and deeper spiritual paths revealed by Compound Numbers.",
}

export default function CompoundNumbersPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">Interpreting </span>
          <span className="text-purple-400">Compound Numbers</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          While single-digit numbers provide the foundation, Compound Numbers (10 and above) reveal the hidden
          influences, karmic lessons, and deeper spiritual paths affecting the querent's life.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/advanced-techniques">Advanced Reading Techniques</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/ethics">The Ethical Responsibilities of a Reader</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            While single-digit numbers provide the foundation, Compound Numbers (10 and above) reveal the hidden
            influences, karmic lessons, and deeper spiritual paths affecting the querent's life. They add a layer of
            complexity and depth that should not be overlooked by simply reducing them to their root number.
          </p>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">10: The Wheel of Fortune</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Represents constant change, cycles of rise
                and fall, and the turning of destiny. It is a sign that one's plans are likely to be carried out, but
                there's an inherent unpredictability to outcomes, as external forces are at play. The karmic lesson is
                to embrace change and adapt, trusting the larger cycles of life.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">11: Clenched Hand, Lion Muzzled</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This is a powerful Master Number but also a
                number of trial and testing. It serves as a warning of hidden dangers, deception, or betrayal from
                unexpected sources. The karmic lesson is to develop profound intuition and spiritual awareness to see
                beyond surface appearances and trust one's inner voice above all else.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">12: The Sacrifice</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number symbolizes the pain of being a
                victim of others' plans or societal pressures. It is associated with self-sacrifice and the anxiety of
                surrendering one's will to a higher cause or to the demands of others. The karmic lesson is to learn to
                set boundaries and find strength in surrendering to a higher spiritual purpose, rather than to the whims
                of others.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">13: Skeleton (Upheaval)</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Often misunderstood as "unlucky," 13 is a
                number of profound transformation through destruction. It represents upheaval and the tearing down of
                old structures to make way for the new. This change is inevitable and powerful. The karmic lesson is to
                learn adaptability and to embrace destruction as a necessary part of rebirth and regeneration.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                14: Combination of People and Things
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number indicates risk and change driven
                by external forces, both human and natural. It warns of potential disruptions from speculation, business
                dealings, or even environmental events. The karmic lesson is about learning moderation, adaptability,
                and emotional control in the face of unpredictable circumstances.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">15: The Magician</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> A number of deep occult significance, tied
                to mystery, magic, and charisma. It bestows a powerful ability to manifest desires and influence others,
                often leading to material success. However, its karmic lesson is to beware the temptation to use this
                power for selfish or negative ends, as it can bind the user to dark forces.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">16: The Tower Struck by Lightning</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> One of the most challenging numbers, it
                warns of sudden danger, accidents, or the complete defeat of one's plans. It represents a fall from
                grace, often due to ego, hubris, or faulty planning. The karmic lesson is profound: one must learn
                humility and rebuild on a more spiritual and authentic foundation after the inevitable collapse.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">17: Star of Venus</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> A highly spiritual and fortunate number,
                representing peace, hope, and spiritual attainment. It signifies that one can rise above trials and find
                success through spiritual perseverance. Its karmic lesson is to maintain faith and trust in the flow of
                the universe, as one's spirit is being guided toward its immortal purpose.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">18: Gray Moon</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number symbolizes the dark side of the
                spiritual world, representing materialism, deception, and social upheavals. It warns of danger from
                illusions, false friends, and following a path devoid of spiritual truth. The karmic lesson is to
                develop keen discernment and navigate the material world without losing one's soul.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">19: The Sun (The Prince of Heaven)</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> An exceptionally fortunate number, bringing
                happiness, success, honor, and the realization of one's potential. It is the number of victory. The
                karmic lesson is that this success is earned through past struggles, and one must use their success to
                bring light and joy to others, avoiding pride and selfishness.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">20: Awakening (Judgment)</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Represents a call to action from a higher
                plane. It signals a period of awakening where one must face their judgments and rise to their full
                potential. While it can bring delays as one integrates new awareness, the karmic lesson is to answer the
                call, embrace new purpose, and let go of the past.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">21: The Universe</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> The number of ultimate victory after a long
                test. It symbolizes success, completion, and the successful integration of a significant life lesson.
                The karmic lesson is one of attainment and earned reward; the querent has mastered a cycle and is ready
                to ascend to a new level of being.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">22: Good Man Blinded</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This Master Number holds immense potential
                but carries a warning of illusion and false judgment. It represents the danger of living in a fool's
                paradise, ignoring reality until it is too late. The karmic lesson is to develop practical wisdom, face
                the truth even when it's unpleasant, and avoid being misled by bad advice or wishful thinking.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">23: Royal Star of the Lion</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This is a highly favorable number promising
                success and help from those in high positions. It grants protection, favor from superiors, and ensures a
                positive outcome for endeavors. It suggests that leadership and ambition will be rewarded.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">24: Gain through Love and Rank</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number signals gain and advantage
                through relationships, partnerships, and romance. It indicates that forming strong alliances and
                cultivating love will lead to material and social advancement. It is favorable for all matters of the
                heart and collaborations.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">25: Strength through Experience</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number indicates that success comes
                only after significant trials and tests. The challenges faced are not punishments but lessons designed
                to build resilience, character, and wisdom. The karmic lesson is to persevere, knowing that early
                difficulties are the foundation for later, well-earned success.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">26: Disasters Caused by Others</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> A warning number, 26 signifies ruin and
                disaster brought about by bad advice, poor partnerships, or the negative influence of others. It
                specifically cautions against risky financial ventures and collaborations built on a weak foundation.
                The karmic lesson is to develop strong discernment in choosing one's associates.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">27: The Scepter</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This is a number of command, authority, and
                intellectual power. It indicates that success will be achieved through creative intelligence, thoughtful
                planning, and leadership. It promises that one's efforts and ideas will be rewarded with respect and
                influence.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">28: The Great Potential with Risk</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number holds the promise of great
                potential and success but carries a significant risk of loss if one is not careful. It symbolizes a
                contradiction: while capable of great things, the person may lose it all through carelessness,
                overconfidence, or poor judgment. The lesson is to balance ambition with pragmatism and caution.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">29: Uncertainties and Deception</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> A number of significant trials,
                uncertainties, and grief. It warns of deception from others, unreliable friends, and potential danger
                from emotional entanglements, particularly with the opposite sex. The karmic lesson is to trust one's
                intuition and be extremely cautious in personal relationships.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">30: Thoughtful Deduction</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number represents mental superiority,
                intellect, and thoughtful analysis. It is not about material gain but about the power of the mind.
                People with this number are often detached, preferring to analyze rather than feel. It is favorable for
                intellectual pursuits but can indicate a sense of loneliness.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">31: Self-Isolation and Loneliness</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Similar to 30, but more extreme, this number
                is often associated with self-imposed isolation and loneliness. The individual may feel above others
                intellectually and withdraw from society. It is not a materially fortunate number, suggesting that focus
                is on inner reflection rather than worldly success.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">32: Magical Power</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Represents the power of communication and
                influence over crowds. If the person's judgment is sound and their purpose is good, this number can be
                highly fortunate and bring great success. However, if used for selfish purposes, the magic will turn
                against them. It favors leadership and persuasion.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">33: Gain Through Love and Rank</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> As a Master Number and a higher octave of
                24, this number is extremely favorable for gains made through love, relationships, and partnerships. It
                suggests success through strong alliances and powerful emotional connections.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                34 and 45: Strength Through Experience
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> These numbers echo the theme of 25,
                indicating that challenges and trials will ultimately lead to strength, mastery, and respected authority
                within the community.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                35 and 46: Disasters Caused by Others
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> These numbers carry the warning of 26,
                cautioning against ruinous partnerships and collaborations that lack clear communication or are built on
                a faulty trust.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">36 and 47: Command and Authority</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Reflecting the power of 27, these numbers
                indicate that command and authority can bring success, but must be wielded wisely to avoid the dangers
                of overreach and arrogance.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                38 and 49: Uncertainties and Deception
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> These numbers carry the difficult energy of
                29, warning of uncertainties, grief, and the need for extreme caution in emotional and personal
                relationships.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">39: Thoughtful Deduction</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This is a higher octave of 30, emphasizing
                that mental clarity and thoughtful deduction are the keys to overcoming trials and avoiding danger.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                40 and 51: Self-Isolation and Loneliness
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> These numbers echo the theme of 31,
                suggesting that while material success may be elusive, the path of solitude and reflection can bring
                great inner strength and spiritual growth.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">41 and 52: Magical Power</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> Reflecting the energy of 32, these numbers
                promise success and favorable outcomes when one's judgment is fair and their will is strong. They
                represent the power to manifest when actions align with integrity.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">42: Warrior Spirit</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number signals sudden advancements and
                opportunities, often in volatile situations. It carries the energy of a warrior, but warns that quick
                changes require resilience and come with inherent risks.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">43: Upheaval and Revolution</h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> A highly unfortunate number, representing
                upheaval, failure, revolution, and strife. It is a warning of sudden disruptions and the potential for
                plans to be completely overturned.
              </p>
            </div>
          </details>

          <details className="border border-border-color rounded-lg mt-8 bg-container-bg transition-all duration-300 open:bg-gray-700 open:border-accent-gold">
            <summary className="font-heading text-2xl font-semibold p-5 cursor-pointer outline-none relative text-text-heading before:content-['▸'] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:rotate-0 before:transition-transform before:duration-300 before:text-accent-gold open:before:rotate-90">
              <h4 className="inline-block ml-6 text-text-heading text-2xl my-0">
                44: Magical Power for Nations and People
              </h4>
            </summary>
            <div className="details-content p-6 pl-10">
              <p className="text-text-main">
                <strong className="text-text-heading">Description:</strong> This number is similar to 24 and 33 but
                emphasizes gain through relationships on a larger scale, such as alliances between nations or
                communities. Emotional balance is key to success.
              </p>
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
          <Link href="/guidebook/advanced-techniques">Advanced Reading Techniques</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/ethics">The Ethical Responsibilities of a Reader</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
