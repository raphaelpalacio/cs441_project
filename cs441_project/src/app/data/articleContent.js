import React from 'react';

export const articleSections = [
  {
    id: "intro",
    title: "Denied and Dismissed: Exposing the Healthcare Appeals Crisis",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">Healthcare coverage—meant to protect—is leaving millions vulnerable, exposed, and battling bureaucratic barriers. Behind every rejected claim lies not just a number but a person: a patient desperate for treatment, a family advocating tirelessly for fairness, an individual whose life has become a battle against paperwork. These stories, combined with compelling data, reveal the stark injustice in healthcare claim denials.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">In 2023, American health insurers processed millions of medical claims. Alarmingly, an unsettling portion were swiftly denied. Data from the Kaiser Family Foundation (KFF) clearly illustrate this harsh reality: insurers wield denial rates as quiet but devastating weapons, slicing through legitimate claims and leaving policyholders trapped in red tape.</p>
      </div>
    ),
  },
  {
    id: "high-denial-rates",
    title: "High Denial Rates",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">Take <span className="text-blue-400 underline">North Carolina</span>&apos;s Blue Cross Blue Shield as an example. It processes over <span className="text-white font-medium">19 million claims</span> annually yet denies nearly <span className="text-white font-medium">four million</span>, equating to a striking <span className="text-white font-medium">19.5%</span> denial rate. Similarly concerning is Oscar Health Plan in <span className="text-blue-400 underline">Illinois</span>, which denies an astonishing <span className="text-white font-medium">29.5%</span> of claims. But these figures become even more troubling upon closer inspection:</p>
        <ul className="list-disc pl-6 mb-5 text-gray-300 space-y-2">
          <li>Oscar Health Plan, Inc. (<span className="text-blue-400 underline">Illinois</span>): <span className="text-white font-medium">29.5%</span> claims denied</li>
          <li>Ambetter from MHS (<span className="text-blue-400 underline">Indiana</span>): <span className="text-white font-medium">49.2%</span> claims denied</li>
          <li>Celtic Insurance Company (Multiple States): <span className="text-white font-medium">49.7%</span> claims denied</li>
          <li>Friday Health Plans (Multiple States): <span className="text-white font-medium">49.9%</span> claims denied</li>
        </ul>
        <p className="mb-4 text-gray-300 leading-relaxed">Even prominent insurers managing millions of claims grapple with fairness. For instance, Blue Care Network of <span className="text-blue-400 underline">Michigan</span> denies over <span className="text-white font-medium">23%</span> of its 4.7 million processed claims annually. This raises a critical question: How many denials are justified, and how many are reckless?</p>
      </div>
    ),
  },
  {
    id: "appeals-process",
    title: "The Appeals Process",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">Yet, for those who dare challenge these denials, the path is daunting. Internal appeals, intended as safeguards, are <span className="text-white font-medium">rarely pursued</span>—not because grievances are few, but because hope is scarce. Blue Cross Blue Shield of <span className="text-blue-400 underline">Wyoming</span> exemplifies this, denying <span className="text-white font-medium">192,396</span> claims yet recording only <span className="text-white font-medium">536</span> internal appeals—a startlingly low appeal rate of just <span className="text-white font-medium">0.0028%</span>. Even more concerning is Molina Healthcare of <span className="text-blue-400 underline">California</span>, which processed over 1.2 million claims and rejected 296,000, yet saw a mere <span className="text-white font-medium">420</span> patients pursue the internal appeals process—an even more negligible rate of just <span className="text-white font-medium">0.00035%</span>.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">For those who persist, victory remains uncertain, though possible. The insurers with the highest internal appeal success rates include:</p>
        <ul className="list-disc pl-6 mb-5 text-gray-300 space-y-2">
          <li>Blue Care Network of <span className="text-blue-400 underline">Michigan</span>: <span className="text-white font-medium">88.6%</span> appeals overturned.</li>
          <li>Moda Health Plan, Inc.: <span className="text-white font-medium">76.9%</span> appeals overturned.</li>
          <li>Providence Health Plan: <span className="text-white font-medium">76.2%</span> appeals overturned.</li>
          <li>McLaren Health Plan Community: <span className="text-white font-medium">74.0%</span> appeals overturned.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "conclusion",
    title: "A Moral Reckoning",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">Yet behind these statistics are real human stories. Consider Jane, whose chronic condition treatment was abruptly denied, forcing her family into an exhausting financial and emotional struggle. Or Mark, whose emergency surgery claim was rejected on technicalities, plunging him into debilitating medical debt. These narratives amplify the injustice hidden within raw data, emphasizing that this issue is not just about numbers—it's a <span className="text-white font-medium">moral crisis</span> demanding immediate action.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Our goal with this project extends beyond mere statistics. It aims to vividly illuminate the disparity between healthcare needs and the cold reality of denials. Healthcare is a <span className="text-white font-medium">fundamental right</span>, not a privilege for the few who can navigate systemic complexities. Through storytelling, complemented by interactive data visualizations crafted using React and D3, we intend to highlight these injustices, empowering audiences with clear, accessible insights.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">By transforming raw data into meaningful stories, we aim to spark dialogue, inform policy, and drive the change urgently needed in healthcare coverage. The system thrives on silence, but through our commitment to clarity and advocacy, we ensure these unjust denials will no longer go unnoticed.</p>
      </div>
    ),
  }
];