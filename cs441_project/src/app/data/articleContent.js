import React from 'react';

export const articleSections = [
  {
    id: "intro",
    title: "Denies and Dismissed: The Current Healthcare Appeals Crisis",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">They call it <span className="text-white font-medium">coverage</span>, yet millions find themselves exposed. Vulnerable. These individuals are left to struggle within the sea of bureaucracy while their medical claims disappear. Behind every reject, there is a story - a patient awaiting treatment, a family fighting for fairness, a life served by papers, people just trying to get to tomorrow.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">In 2023, millions of claims are coursed through the American health care insurance system, and yet, an alarming portion never make it through. The data from the Kaiser Family Foundation - KFF - reveals an unsettling trend: issuers wield denial rates as silent scythes, curing down countless claims, leaving policyholders tangled in red tape.</p>
      </div>
    ),
  },
  {
    id: "high-denial-rates",
    title: "High Denial Rates",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">Take <span className="text-blue-400 underline">North Carolina</span>&apos;s Blue Cross Blue Shield for example. They process over <span className="text-white font-medium">19 million claims per year</span>, but slam the door on nearly <span className="text-white font-medium">four million</span> of them. They have a staggering <span className="text-white font-medium">19.5%</span> denial rate. Meanwhile, Oscar Health Plan, Inc., an issuer in <span className="text-blue-400 underline">Illinois</span>, has an eye watering <span className="text-white font-medium">29.5%</span> claim rejection rate.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Among the highest denial rates, some states stand out as particularly harsh:</p>
        <ul className="list-disc pl-6 mb-5 text-gray-300 space-y-2">
          <li><span className="text-blue-400 underline">Illinois</span> – Oscar Health Plan has <span className="text-white font-medium">29.5%</span> of claims denied.</li>
          <li><span className="text-blue-400 underline">Indiana</span> – Ambetter from MHS has <span className="text-white font-medium">49.2%</span> of claims denied.</li>
          <li><span className="text-blue-400 underline">Texas</span> – Celtic Insurance Company has <span className="text-white font-medium">49.7%</span> of claims denied.</li>
          <li><span className="text-blue-400 underline">Colorado</span> – Friday Health Plans has <span className="text-white font-medium">49.9%</span> of claims denied.</li>
        </ul>
        <p className="mb-4 text-gray-300 leading-relaxed">Even well established issuers with millions of claims under management seem to struggle with fairness. In <span className="text-blue-400 underline">Michigan</span>, Blue Care Network receives 4.7 million claims and denies over <span className="text-white font-medium">23%</span> of these claims. With all of these denials, one must ask: How many were rightful, and how many were reckless? Rural states like <span className="text-blue-400 underline">Wyoming</span> and <span className="text-blue-400 underline">Montana</span> also face significant challenges with high denial rates, affecting their already limited healthcare access.</p>
      </div>
    ),
  },
  {
    id: "appeals-process",
    title: "The Appeals Process",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">For those daring enough to challenge these denials, the road is arduous. Internal appeals, the first line of defense, are <span className="text-white font-medium">rarely filed</span>—not for lack of grievances, but for lack of hope. Among major insurers across states like <span className="text-blue-400 underline">California</span>, <span className="text-blue-400 underline">Texas</span>, and <span className="text-blue-400 underline">Florida</span>, appeal rates are often a fraction of a fraction.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Consider Blue Cross Blue Shield of <span className="text-blue-400 underline">Wyoming</span>, which denied <span className="text-white font-medium">192,396</span> claims yet saw a mere <span className="text-white font-medium">536</span> internal appeals filed—an appeal rate of just <span className="text-white font-medium">0.0028%</span>. Similarly, Molina Healthcare of <span className="text-blue-400 underline">California</span> processed over 1.2 million claims, denied 296,000, yet only filed <span className="text-white font-medium">420</span> internal appeals—an appeal rate of <span className="text-white font-medium">0.00035%</span>.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Even when appeals are pursued, victory is far from certain. Among insurers with the highest success rates in overturning internal appeals:</p>
        <ul className="list-disc pl-6 mb-5 text-gray-300 space-y-2">
          <li><span className="text-blue-400 underline">Michigan</span> – Blue Care Network overturned <span className="text-white font-medium">88.6%</span> of appeals.</li>
          <li><span className="text-blue-400 underline">Oregon</span> – Moda Health Plan, Inc. overturned <span className="text-white font-medium">76.9%</span>.</li>
          <li><span className="text-blue-400 underline">Oregon</span> – Providence Health Plan overturned <span className="text-white font-medium">76.2%</span>.</li>
          <li><span className="text-blue-400 underline">Michigan</span> – McLaren Health Plan Community overturned <span className="text-white font-medium">74.0%</span>.</li>
        </ul>
        <p className="mb-4 text-gray-300 leading-relaxed">Patients in states like <span className="text-blue-400 underline">New York</span>, <span className="text-blue-400 underline">Massachusetts</span>, and <span className="text-blue-400 underline">Washington</span> have somewhat better appeal processes, yet still face significant barriers when challenging healthcare denials.</p>
      </div>
    ),
  },
  {
    id: "conclusion",
    title: "A Moral Reckoning",
    content: (
      <div>
        <p className="mb-4 text-gray-300 leading-relaxed">This is more than a conversation about numbers—it is a <span className="text-white font-medium">moral reckoning</span>. The data paints a picture, but the real stories lie behind each denial, behind each patient forced to fight a system stacked against them.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Health is not a privilege. It is a <span className="text-white font-medium">right</span>. And until the scales tip toward fairness, the silent suffering will continue—one denied claim at a time.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">One of the goals that we have with this project is to highlight the disparity between healthcare needs, claims, and denials. This issue is not just a policy flaw—it&apos;s a uniquely American crisis where people must fight for the care they deserve. Submitting a claim shouldn&apos;t be an exhausting battle, yet for many, it is.</p>
        <p className="mb-4 text-gray-300 leading-relaxed">Through our work, we aim to make this issue clear, accessible, and impossible to ignore. By leveraging React and D3, we will transform raw data into interactive visuals that expose the patterns of injustice within the system.</p>
      </div>
    ),
  }
];