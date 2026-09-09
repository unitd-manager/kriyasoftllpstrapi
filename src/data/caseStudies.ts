import health1 from '../assets/health1.webp';
import health2 from '../assets/health2.png';
import finance1 from '../assets/finance11.webp';
import finance2 from '../assets/finance2.png';
import ai1 from '../assets/AI11.webp';
import ai2 from '../assets/AI2.png';

export interface CaseStudy {
  slug: string;
  industry: string;
  title: string;
  result: string;
  img: string;
  secondaryImg: string;
  readTime: string;
  date: string;
  summary: string;
  challenge: string;
  solution: string[];
  phases: { title: string; desc: string }[];
  outcomes: { label: string; value: string }[];
  stack: string[];
  quote: { text: string; author: string; role: string };
}

const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: 'hipaa-telehealth-platform',
    industry: 'Healthcare',
    title: 'HIPAA-compliant telehealth infrastructure for 5k patients',
    /*result: '99.99% uptime achieved',*/
    result: '99.99% uptime achieved',
    img: health1,
    secondaryImg: health2,
    readTime: '9 min read',
    date: '14 May 2026',
    summary:
      'A regional healthcare network needed to modernize a fragmented, legacy EHR setup into a single, HIPAA-compliant platform capable of supporting live telehealth consultations at scale.',
    challenge:
      'The client ran on siloed legacy EHR systems that could not interoperate, causing delayed patient records, duplicated data entry, and compliance risk during audits. Telehealth demand was growing faster than their infrastructure could support securely, and clinicians were losing hours per week to manual chart reconciliation across systems that were never designed to talk to each other.',
    solution: [
      'Designed and built a HIPAA-compliant system architecture with end-to-end encrypted data pipelines',
      'Delivered EHR integration and modernization across three legacy systems into one unified patient record using HL7/FHIR',
      'Built a telehealth platform supporting live video consultations, e-prescriptions, and appointment scheduling',
      'Implemented healthcare analytics dashboards for clinical and operational business intelligence',
    ],
    phases: [
      { title: 'Compliance Audit', desc: 'Mapped every data flow against HIPAA requirements before writing a line of code.' },
      { title: 'Unified Data Layer', desc: 'Built an HL7/FHIR integration layer to merge three legacy EHRs into one patient record.' },
      { title: 'Telehealth Rollout', desc: 'Shipped live video consults, e-prescriptions, and scheduling in a phased regional rollout.' },
      { title: 'Monitoring & Scale', desc: 'Added 24/7 uptime monitoring and auto-scaling ahead of peak flu-season demand.' },
    ],
    outcomes: [
      { label: 'Platform Uptime', value: '99.99%' },
      { label: 'Patients Onboarded', value: '5k+' },
      { label: 'Record Sync Time', value: '-85%' },
      { label: 'Compliance Audits Passed', value: '100%' },
    ],
    stack: ['HL7/FHIR', 'AWS', 'Node.js', 'React', 'PostgreSQL'],
    quote: {
      text: 'Our clinicians stopped fighting the software and started using it. That shift alone paid for the project.',
      author: 'VP of Clinical Operations',
      role: 'Regional Healthcare Network',
    },
  },
  {
    slug: 'realtime-payments-platform',
    industry: 'Finance',
    title: 'Real-time payments platform processing 2M+ transactions daily',
    result: '60% latency reduction',
    img: finance1,
    secondaryImg: finance2,
    readTime: '10 min read',
    date: '2 June 2026',
    summary:
      'A fintech client needed a transaction processing and settlement system that could scale to millions of daily payments while meeting strict AML and KYC regulatory requirements.',
    challenge:
      'Their existing payment rails buckled under peak load, causing settlement delays and manual compliance reviews that could not keep pace with transaction volume or regulator expectations. Every growth spike meant more manual AML flags queued for human review, and the backlog itself was becoming a compliance liability.',
    solution: [
      'Re-architected the payment processing and settlement pipeline for horizontal scale',
      'Built automated AML and KYC regulatory compliance checks directly into the transaction flow',
      'Delivered real-time financial data analytics and reporting for risk and operations teams',
      'Hardened the platform with continuous monitoring and automated failover across regions',
    ],
    phases: [
      { title: 'Load Analysis', desc: 'Profiled peak-hour bottlenecks in the legacy settlement pipeline.' },
      { title: 'Compliance Automation', desc: 'Moved AML/KYC checks from manual queues into automated, rules-based transaction scoring.' },
      { title: 'Horizontal Scale-Out', desc: 'Re-platformed settlement onto a Kafka-based event pipeline for elastic throughput.' },
      { title: 'Regional Failover', desc: 'Added multi-region redundancy to protect uptime during peak transaction windows.' },
    ],
    outcomes: [
      { label: 'Daily Transactions', value: '2M+' },
      { label: 'Latency Reduction', value: '60%' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Manual Reviews', value: '-70%' },
    ],
    stack: ['Kafka', 'Java', 'PostgreSQL', 'Kubernetes', 'Redis'],
    quote: {
      text: 'We went from dreading Black Friday-scale traffic to using it as a benchmark. The platform just holds.',
      author: 'Head of Engineering',
      role: 'Fintech Payments Provider',
    },
  },
  {
    slug: 'ai-supply-chain-optimization',
    industry: 'AI & Machine Learning',
    title: 'AI-powered supply chain optimization for global manufacturer',
    result: '35% ops cost savings',
    img: ai1,
    secondaryImg: ai2,
    readTime: '8 min read',
    date: '18 May 2026',
    summary:
      'A global manufacturer needed predictive intelligence to cut waste and downtime across a supply chain spanning dozens of facilities and suppliers.',
    challenge:
      'Demand forecasting was manual and reactive, leading to overstock in some facilities and stockouts in others, with no unified visibility into where inefficiencies were compounding. Planners were making six-figure ordering decisions off spreadsheets that were already a week out of date by the time they were reviewed.',
    solution: [
      'Developed custom predictive analytics models for demand forecasting across every facility',
      'Built intelligent automation to trigger reordering and logistics decisions in real time',
      'Applied computer vision for automated inventory and quality inspection on production lines',
      'Delivered a unified business intelligence dashboard for supply chain leadership',
    ],
    phases: [
      { title: 'Data Unification', desc: 'Consolidated fragmented facility-level data into a single forecasting pipeline.' },
      { title: 'Model Development', desc: 'Trained and validated demand-forecasting models against two years of historical variance.' },
      { title: 'Computer Vision Rollout', desc: 'Deployed vision-based inventory and quality checks on production lines.' },
      { title: 'Automation Layer', desc: 'Connected forecasts directly to reordering and logistics triggers — no manual handoff.' },
    ],
    outcomes: [
      { label: 'Operational Cost Savings', value: '35%' },
      { label: 'Forecast Accuracy', value: '+42%' },
      { label: 'Stockout Incidents', value: '-58%' },
      { label: 'Facilities Covered', value: '30+' },
    ],
    stack: ['Python', 'TensorFlow', 'Airflow', 'Snowflake', 'React'],
    quote: {
      text: 'For the first time, our planners are working from forecasts instead of guesses. The savings followed naturally.',
      author: 'Director of Supply Chain',
      role: 'Global Manufacturing Group',
    },
  },
];

export default fallbackCaseStudies;
export const caseStudies = fallbackCaseStudies;