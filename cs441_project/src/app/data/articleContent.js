import React from 'react';

export const articleSections = [
  {
    id: "intro",
    title: "Denies and Dismissed: The Current Healthcare Appeals Crisis",
    content: (
      <div>
        <p className="mb-4">They call it <span className="text-red-500 font-medium">coverage</span>, yet millions find themselves exposed. Vulnerable. These individuals are left to struggle within the sea of bureaucracy while their medical claims disappear. Behind every reject, there is a story - a patient awaiting treatment, a family fighting for fairness, a life served by papers, people just trying to get to tomorrow.</p>
        <p className="mb-4">In 2023, millions of claims are coursed through the American health care insurance system, and yet, an alarming portion never make it through. The data from the Kaiser Family Foundation - KFF - reveals an unsettling trend: issuers wield denial rates as silent scythes, curing down countless claims, leaving policyholders tangled in red tape.</p>
      </div>
    ),
  },
  {
    id: "high-denial-rates",
    title: "High Denial Rates",
    content: (
      <div>
        <p className="mb-4">Take North Carolina's Blue Cross Blue Shield for example. They process over <span className="text-red-500 font-medium">19 million claims per year</span>, but slam the door on nearly <span className="text-red-500 font-medium">four million</span> of them. They have a staggering <span className="text-red-500 font-medium">19.5%</span> denial rate. Meanwhile, Oscar Health Plan, Inc., an issuer in Illinois, has an eye watering <span className="text-red-500 font-medium">29.5%</span> claim rejection rate.</p>
        <p className="mb-4">Among the highest denial rates, some stand out has particularly harsh:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Oscar Health Plan, Inc. (Illinois) – <span className="text-red-500 font-medium">29.5%</span> of claims denied.</li>
          <li>Ambetter from MHS (Indiana) – <span className="text-red-500 font-medium">49.2%</span> of claims denied.</li>
          <li>Celtic Insurance Company (Multiple States) – <span className="text-red-500 font-medium">49.7%</span> of claims denied.</li>
          <li>Friday Health Plans (Multiple States) – <span className="text-red-500 font-medium">49.9%</span> of claims denied.</li>
        </ul>
        <p className="mb-4">Even well established issues with millions of claims under management seem to struggle with fairness. Blue Care Network of Michigan, receives 4.7 million claims and denies over <span className="text-red-500 font-medium">23%</span> of these claims. With all of these claims ones must ask: How many of these denials were rightful, and how many were reckless.</p>
      </div>
    ),
  },
  {
    id: "appeals-process",
    title: "The Appeals Process",
    content: (
      <div>
        <p className="mb-4">For those daring enough to challenge these denials, the road is arduous. Internal appeals, the first line of defense, are <span className="text-red-500 font-medium">rarely filed</span>—not for lack of grievances, but for lack of hope. Among major insurers, appeal rates are often a fraction of a fraction.</p>
        <p className="mb-4">Consider Blue Cross Blue Shield of Wyoming, which denied <span className="text-red-500 font-medium">192,396</span> claims yet saw a mere <span className="text-red-500 font-medium">536</span> internal appeals filed—an appeal rate of just <span className="text-red-500 font-medium">0.0028%</span>. Similarly, Molina Healthcare of California processed over 1.2 million claims, denied 296,000, yet only filed <span className="text-red-500 font-medium">420</span> internal appeals—an appeal rate of <span className="text-red-500 font-medium">0.00035%</span>.</p>
        <p className="mb-4">Even when appeals are pursued, victory is far from certain. Among insurers with the highest success rates in overturning internal appeals:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Blue Care Network of Michigan overturned <span className="text-red-500 font-medium">88.6%</span> of appeals.</li>
          <li>Moda Health Plan, Inc. overturned <span className="text-red-500 font-medium">76.9%</span>.</li>
          <li>Providence Health Plan overturned <span className="text-red-500 font-medium">76.2%</span>.</li>
          <li>McLaren Health Plan Community overturned <span className="text-red-500 font-medium">74.0%</span>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "conclusion",
    title: "A Moral Reckoning",
    content: (
      <div>
        <p className="mb-4">This is more than a conversation about numbers—it is a <span className="text-red-500 font-medium">moral reckoning</span>. The data paints a picture, but the real stories lie behind each denial, behind each patient forced to fight a system stacked against them.</p>
        <p className="mb-4">Health is not a privilege. It is a <span className="text-red-500 font-medium">right</span>. And until the scales tip toward fairness, the silent suffering will continue—one denied claim at a time.</p>
        <p className="mb-4">One of the goals that we have with this project is to highlight the disparity between healthcare needs, claims, and denials. This issue is not just a policy flaw—it's a uniquely American crisis where people must fight for the care they deserve. Submitting a claim shouldn't be an exhausting battle, yet for many, it is.</p>
        <p className="mb-4">Through our work, we aim to make this issue clear, accessible, and impossible to ignore. By leveraging React and D3, we will transform raw data into interactive visuals that expose the patterns of injustice within the system.</p>
      </div>
    ),
  }
];