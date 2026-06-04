import React, { useState, useMemo } from 'react';
import './App.css';
import { ChevronLeft, ChevronRight, BarChart3, AlertTriangle, Lightbulb, Activity, CheckCircle2, Calculator, ShieldCheck, Target, BookOpen, LineChart, Cpu, Sliders, MapPin, Globe, Database } from 'lucide-react';
import { BarChart, Bar, LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Legend, Cell, AreaChart, Area } from 'recharts';

export default function Presentation() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // --- INTERACTIVE STATE VARIABLES ---
  const [minPremium, setMinPremium] = useState(300);
  const [contributionRate, setContributionRate] = useState(2.75);
  const [survivalCostPercent, setSurvivalCostPercent] = useState(78.4); 

  const [attritionRate, setAttritionRate] = useState(25);
  const [moralHazard, setMoralHazard] = useState(15);
  
  const [appmIncome, setAppmIncome] = useState(8000);

  // --- DYNAMIC DATA CALCULATIONS ---
  const dynamicComparisonData = useMemo(() => {
    const incomes = [0, 5000, 8000, 10000, 10909, 15000, 18182, 25000, 35000];
    return incomes.map(income => ({
      income,
      NHIF: 500,
      SHIF: Math.max(income * (contributionRate / 100), minPremium)
    }));
  }, [minPremium, contributionRate]);

  const dynamicSolvencyData = useMemo(() => {
    const baseRev = 72949.11; 
    const baseClaims = 68300.60;
    
    const shockedRev = baseRev * (1 - attritionRate / 100);
    const shockedClaims = baseClaims * (1 + moralHazard / 100);
    const deficit = shockedRev - shockedClaims;
    const lossRatio = (shockedClaims / shockedRev) * 100;

    return {
      revenue: shockedRev,
      claims: shockedClaims,
      deficit: deficit,
      lossRatio: lossRatio,
      chartData: [
        { name: 'Revenue (Contributions)', Value: Number(shockedRev.toFixed(0)), fill: '#3b82f6' },
        { name: 'Liabilities (Claims)', Value: Number(shockedClaims.toFixed(0)), fill: '#ef4444' },
      ]
    };
  }, [attritionRate, moralHazard]);

  // --- STATIC DATA ARRAYS ---
  const staticBurdenData = [
    { name: '5000', Burden: 27.8 },
    { name: '8000', Burden: 17.3 },
    { name: '10909', Burden: 12.6 },
    { name: '15000', Burden: 9.2 },
    { name: '18182', Burden: 7.6 },
    { name: '25000', Burden: 6.0 },
    { name: '35000', Burden: 4.3 },
  ];

  const arimaData = [
    { year: '2024', Revenue: 72949, Claims: 68300 },
    { year: '2025', Revenue: 75137, Claims: 71032 },
    { year: '2026', Revenue: 77391, Claims: 73873 },
    { year: '2027', Revenue: 79712, Claims: 76828 },
    { year: '2028', Revenue: 82103, Claims: 79901 },
    { year: '2029', Revenue: 84566, Claims: 83097 },
  ];

  const lossRatioData = [
    { year: '2017', Ratio: 75.5 }, { year: '2018', Ratio: 86.0 }, { year: '2019', Ratio: 94.8 },
    { year: '2020', Ratio: 89.8 }, { year: '2021', Ratio: 88.9 }, { year: '2022', Ratio: 81.5 },
    { year: '2023', Ratio: 83.2 }, { year: '2024', Ratio: 93.63 },
  ];
  
  const postShockLossRatioData = [
    { name: "Status Quo (SHIF)", LossRatio: 143.5, fill: "#ef4444" },
    { name: "Proposed (APPM)", LossRatio: 96.9, fill: "#22c55e" }
  ];

  // APPM Simulator Logic
  let simTier, simRt, simSi, simPayment;
  if(appmIncome < 10909) { simTier = 1; simRt = 1.0; simSi = appmIncome * 0.01; simPayment = 0; }
  else if (appmIncome < 20000) { simTier = 2; simRt = 1.5; simSi = 0; simPayment = appmIncome * 0.015; }
  else if (appmIncome < 50000) { simTier = 3; simRt = 2.0; simSi = 0; simPayment = appmIncome * 0.02; }
  else { simTier = 4; simRt = 2.75; simSi = 0; simPayment = appmIncome * 0.0275; }

  // --- 27 SLIDES DEFINITION ---
  const slides = [
    // 1
    {
      title: "Title", type: 'title', section: null,
      content: (
        <div className="flex-center">
          <ShieldCheck size={90} className="text-blue" />
          <h1 className="title-main">Actuarial Solvency Analysis of Kenya's SHIF</h1>
          <h2 className="title-sub">Transition Risks within the Informal Sector</h2>
          <div className="title-meta">
            <strong>University of Nairobi | 2026</strong>
            <p>Waweru B Njihia | Faith Grace Hongo | John Gitua Mwaura<br/>Marion Atieno Otieno | Nicole Charity Ido</p>
          </div>
        </div>
      )
    },
    // 2
    {
      title: "Background: The UHC Transition", section: "Introduction", badge: "badge-intro", icon: <Globe size={32} className="text-blue" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">In 2023, Kenya shifted its state health insurance scheme from a voluntary NHIF to a mandatory SHIF, to achieve Universal Health Coverage goals.</p>
          <div className="grid-2 w-full mt-4">
            <div className="card">
              <h3 className="text-blue">The Historical Failure</h3>
              <p>Historically, the NHIF struggled to maintain coverage among informal workers because their incomes fluctuate, leading to massive premium defaults under flat rates.</p>
            </div>
            <div className="card card-blue">
              <h3 className="text-blue">The New Approach</h3>
              <p>While this shift aims to establish a more equitable framework, applying a standardized 2.75% deduction anchored by a Ksh 300 monthly premium introduces significant actuarial risks.</p>
            </div>
          </div>
        </div>
      )
    },
    // 3
    {
      title: "The 'Missing Middle' Crisis", section: "Introduction", badge: "badge-intro", icon: <Activity size={32} className="text-red" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">The transition is complicated by a massive segment of the informal economy whose earnings disqualify them from government safety-net subsidies, but are insufficient to sustain mandatory premiums.</p>
          <ul className="list-layout">
            <li className="list-item">
              <AlertTriangle size={28} className="list-icon text-amber" />
              <div>
                <span className="list-item-title">Suppressed Enrollment</span>
                <p>Recent nationally representative data indicates actual health insurance enrollment among Kenya's informal sector workers remains severely suppressed at roughly 21.75%.</p>
              </div>
            </li>
            <li className="list-item">
              <CheckCircle2 size={28} className="list-icon text-red" />
              <div>
                <span className="list-item-title">The Flat-Rate Threat</span>
                <p>Charging a fixed minimum premium to populations with seasonal, unpredictable incomes introduces a major actuarial risk, as the informal sector constitutes over 80% of Kenya's workforce.</p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    // 4
    {
      title: "Problem Statement: Structural & Operational", section: "Introduction", badge: "badge-intro", icon: <AlertTriangle size={32} className="text-amber" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <p className="slide-description">The transition fundamentally alters the financial obligations of the informal sector. The execution inadvertently penalizes the most economically vulnerable.</p>
          <div className="grid-2 mt-2">
            <div className="card card-red">
              <h3 className="text-red">Inequity of the Flat Rate</h3>
              <p>The 2.75% Flat Rate and Statutory Floor of Ksh 300 acts as a highly regressive tax rather than a proportional contribution for low earners.</p>
            </div>
            <div className="card card-amber">
              <h3 className="text-amber">Algorithmic Rigidity</h3>
              <p>The Proxy Means Testing (PMT) algorithm frequently overestimates a household's income, forcing vulnerable populations into rigid contribution tiers.</p>
            </div>
            <div className="card">
              <h3 className="text-blue">Benefit Ceilings</h3>
              <p>Disease Categorization and Benefit Restrictions act as "financial ceilings," severely limiting the expected utility of the insurance for routine health concerns.</p>
            </div>
            <div className="card">
              <h3 className="text-blue">Value Lag</h3>
              <p>Rigid 90-day waiting periods for defaulters and massive payout backlogs force out-of-pocket spending despite coverage.</p>
            </div>
          </div>
        </div>
      )
    },
    // 5
    {
      title: "Research Objectives", section: "Introduction", badge: "badge-intro", icon: <Target size={32} className="text-blue" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center font-bold">Main Objective: To mathematically evaluate the affordability, default risk, and long-term sustainability of the SHIF transition.</p>
          <div className="grid-2 mt-2">
            <div className="card card-blue">
              <h3>1. Structural Viability</h3>
              <p>To evaluate if the Ksh 300 minimum premium is structurally sound via Affordability Indexing.</p>
            </div>
            <div className="card card-blue">
              <h3>2. Predict Non-Compliance</h3>
              <p>To calculate the mathematical probability of premium default using logistic regression.</p>
            </div>
            <div className="card card-blue">
              <h3>3. Project Solvency</h3>
              <p>Establish a macroeconomic baseline of claims via time series forecasting and project 5-year solvency (to 2029).</p>
            </div>
            <div className="card card-green">
              <h3 className="text-green">4. Propose Solutions</h3>
              <p>Develop a viable alternative formula (APPM) to prevent system collapse.</p>
            </div>
          </div>
        </div>
      )
    },
    // 6
    {
      title: "Core Theories: Expected Utility", section: "Literature Review", badge: "badge-lit", icon: <BookOpen size={32} className="text-purple" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">Expected Utility Theory models an informal worker's decision to pay premiums under uncertainty. They rationally compare the utility of retaining cash versus paying for insurance.</p>
          
          <div className="grid-2 w-full mt-4">
            <div className="card">
              <h3 className="text-purple">The Calculation</h3>
              <p>Workers weigh their current disposable income against the probability of falling ill. Paying a mandatory Ksh 300 represents an immediate, guaranteed loss of capital.</p>
            </div>
            <div className="card card-red">
              <h3 className="text-red">The Conclusion</h3>
              <p>For low-income earners facing potential starvation, the marginal utility of keeping Ksh 300 today heavily outweighs the future probability of needing a hospital tomorrow.</p>
            </div>
          </div>
        </div>
      )
    },
    // 7
    {
      title: "Core Theories: Systemic Risk", section: "Literature Review", badge: "badge-lit", icon: <Database size={32} className="text-purple" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">Systemic theories model the structural mechanics that determine whether the national risk pool survives the transition or collapses into <strong>Technical Insolvency</strong>.</p>
          <div className="grid-2 w-full">
            <div className="card">
              <h3 className="text-blue">Adverse Selection</h3>
              <p><strong>Definition:</strong> Information asymmetry leads to healthy workers evading the Ksh 300 premium, while those with chronic illnesses ensure it is paid, artificially concentrating risk in the pool.</p>
            </div>
            <div className="card">
              <h3 className="text-blue">Moral Hazard</h3>
              <p><strong>Definition:</strong> Once shielded from direct medical costs by the SHIF mandate, households will predictably spike their utilization of healthcare facilities beyond historical baselines.</p>
            </div>
          </div>
        </div>
      )
    },
    // 8
    {
      title: "Comparative Analysis: Regional Lessons", section: "Literature Review", badge: "badge-lit", icon: <Globe size={32} className="text-green" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">How have peer nations addressed the actuarial risks of integrating the informal sector?</p>
          <div className="card w-full card-green">
            <h3 className="text-green">Rwanda (CBHI "Ubudehe")</h3>
            <p className="mt-2">Abandoned flat-rate premiums because they proved highly regressive. They implemented socio-economic categorization where Category I (No Income) is 100% subsidized by the state.</p>
          </div>
          <div className="grid-2 w-full mt-4">
             <div className="card card-blue">
              <h3 className="text-blue">Ghana (NHIS)</h3>
              <p>Rely heavily on a 2.5% consumption tax (VAT) to fund healthcare. This creates a stable revenue floor less sensitive to agricultural shocks than out-of-pocket premiums.</p>
            </div>
            <div className="card card-blue">
              <h3 className="text-blue">Thailand (UCS)</h3>
              <p>Achieved automatic compliance by integrating the uninsured via general taxation, separating healthcare financing from the immediate income volatility of the poor.</p>
            </div>
          </div>
        </div>
      )
    },
    // 9
    {
      title: "The Homa Bay Proxy Context", section: "Methodology", badge: "badge-method", icon: <MapPin size={32} className="text-amber" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">This study purposefully selected Homa Bay County to serve as a representative macroeconomic proxy for Kenya's highly volatile informal sector.</p>
          <div className="grid-2 w-full">
            <div className="card">
              <h3 className="text-amber">Economic Reality</h3>
              <p>Homa Bay exhibits a high poverty index (28.2%) and an economy heavily skewed toward seasonal agriculture and fishing, characterized by extreme cash flow volatility.</p>
            </div>
            <div className="card">
              <h3 className="text-amber">Actuarial Necessity</h3>
              <p>In actuarial risk modeling, it is necessary to stress-test financial frameworks against highly vulnerable cohorts (the weakest link) rather than national averages to prove true solvency.</p>
            </div>
          </div>
        </div>
      )
    },
    // 10
    {
      title: "Macro-Level: Time Series Forecasting", section: "Methodology", badge: "badge-method", icon: <LineChart size={32} className="text-blue" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">To establish a baseline of "status quo" claims and revenues, we applied a stochastic time-series forecast to 8 years of audited NHIF ledgers.</p>
          
          <div className="math-block w-full">
            <div>Y<sub>t</sub> = c + Y<sub>t-1</sub> + ε<sub>t</sub></div>
            <div className="math-caption">ARIMA(0,1,0) Random Walk with Drift</div>
          </div>

          <div className="card w-full mt-2" style={{padding:'1rem'}}>
             <h3 className="text-blue" style={{marginBottom:'0.5rem'}}>Why ARIMA(0,1,0)?</h3>
             <ul className="list-layout" style={{gap:'0.5rem', fontSize:'0.95rem'}}>
               <li><strong>d=1 (Differencing):</strong> Handles the non-stationary, persistent upward trend in claims.</li>
               <li><strong>p=0, q=0:</strong> Confirms steady step-by-step progression without cyclical lags.</li>
               <li><strong>Drift Constant (c):</strong> Accounts for the historical medical inflation rate.</li>
             </ul>
          </div>
        </div>
      )
    },
    // 11
    {
      title: "Micro-Level: Default Risk Modeling", section: "Methodology", badge: "badge-method", icon: <Calculator size={32} className="text-amber" />,
      content: (
        <div className="flex-center" style={{alignItems:'flex-start'}}>
          <p className="slide-description">To mathematically calculate the probability of premium default, a binomial Logistic Regression model was simulated (n=1000).</p>
          
          <div className="math-block w-full">
            <div>P(default) = 1 / (1 + e<sup>-(β₀ + β₁A + β₂V + β₃Y)</sup>)</div>
            <div className="math-caption">Binomial Logistic Regression Equation</div>
          </div>

          <div className="grid-2 w-full mt-2">
            <div className="card" style={{padding: '1rem'}}>
              <h3 className="text-amber">The Variables</h3>
              <p><strong>A<sub>i</sub> (Affordability):</strong> Premium / Disposable Income.<br/>
              <strong>V<sub>i</sub> (Volatility Income):</strong> Standard deviation of monthly cash flows.<br/>
              <strong>Y<sub>i</sub> (Gross Income):</strong> Absolute earnings baseline.</p>
            </div>
            <div className="card card-blue" style={{padding: '1rem'}}>
              <h3 className="text-blue">The Beta Coefficients (β)</h3>
              <p><strong>β₁, β₂, β₃:</strong> The regression coefficients generated by the model. These mathematically indicate the <em>weight</em> and <em>direction</em> of each risk factor in driving a default.</p>
            </div>
          </div>
        </div>
      )
    },
    // 12
    {
      title: "The SHIF Contribution Formula", section: "Data Analysis", badge: "badge-data", icon: <Calculator size={32} className="text-blue" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">The SHIF introduces a proportional rate (2.75%), but mathematically overrides it with a hard floor (Ksh 300) for low earners.</p>
          
          <div className="math-block w-full" style={{padding:'1rem'}}>
            <div>C<sub>i</sub> = max(0.0275 × Y<sub>i</sub>, 300)</div>
          </div>

          <table className="data-table mt-2">
            <thead>
              <tr><th>Income (Y)</th><th>0.0275 × Y</th><th>Final SHIF (C)</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>5,000</td><td>137.50</td><td className="text-red"><strong>300</strong></td><td className="text-red">Hits Statutory Floor</td></tr>
              <tr><td>8,000</td><td>220.00</td><td className="text-red"><strong>300</strong></td><td className="text-red">Hits Statutory Floor</td></tr>
              <tr style={{backgroundColor: '#fffbeb'}}><td>10,000</td><td>275.00</td><td className="text-amber"><strong>300</strong></td><td className="text-amber">Hits Statutory Floor</td></tr>
              <tr style={{backgroundColor: '#fef2f2'}}><td><strong>10,909</strong></td><td>300.00</td><td><strong>300</strong></td><td className="text-amber">Floor Breakeven</td></tr>
              <tr><td>15,000</td><td>412.50</td><td>412.50</td><td className="text-green">Proportional Rate</td></tr>
              <tr><td>25,000</td><td>687.50</td><td>687.50</td><td className="text-green">Proportional Rate</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    // 13
    {
      title: "Deriving the Affordability Index", section: "Data Analysis", badge: "badge-data", icon: <AlertTriangle size={32} className="text-red" />,
      content: (
        <div className="flex-center">
          <p className="slide-description text-center">Gross income is a poor metric for the informal sector. We must mathematically isolate <strong>Disposable Income (DI)</strong> to measure the true premium burden.</p>
          
          <div className="math-block w-full">
            <div style={{marginBottom: '0.5rem'}}>DI<sub>i</sub> = Y<sub>i</sub> × (1 - α<sub>i</sub>)</div>
            <div>A<sub>i</sub> = C<sub>i</sub> / DI<sub>i</sub></div>
            <div className="math-caption">Disposable Income & Affordability Ratio</div>
          </div>

          <div className="grid-2 w-full mt-2">
            <div className="card">
              <h3 className="text-blue">Survival Cost Coefficient (<span className="math-inline">α</span>)</h3>
              <p>Stochastically defined as <span className="math-inline">α ~ U(0.70, 0.85)</span>. Poorer families lock up to 85% of cash in non-discretionary survival needs (food, rent).</p>
            </div>
            <div className="card card-red">
              <h3 className="text-red">Catastrophic Threat</h3>
              <p>If <span className="math-inline">A<sub>i</sub> &gt; 10%</span> (the WHO threshold), the Ksh 300 premium becomes a <strong>Catastrophic Health Expenditure</strong>, triggering defaults.</p>
            </div>
          </div>
        </div>
      )
    },
    // 14
    {
      title: "The Regressive Burden", section: "Data Analysis", badge: "badge-data", icon: <BarChart3 size={32} className="text-red" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center">For the lowest earners, the rigid statutory floor acts as a highly regressive flat tax, consuming dangerous levels of disposable cash.</p>
          <div className="card chart-container" style={{ flexGrow: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staticBurdenData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: 'Gross Monthly Income (Ksh)', position: 'bottom', offset: 5 }} />
                <YAxis label={{ value: 'Affordability Ratio (A) %', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <ReferenceLine y={10} label="WHO Catastrophic Threshold (10%)" stroke="#000" strokeDasharray="5 5" strokeWidth={2} />
                <Bar dataKey="Burden" label={{ position: 'top', formatter: (val) => `${val}%` }}>
                  {
                    staticBurdenData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.Burden > 10 ? '#ef4444' : '#22c55e'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    // 15
    {
      title: "The Algorithmic Disconnect", section: "Data Analysis", badge: "badge-data", icon: <Cpu size={32} className="text-blue" />,
      content: (
        <div className="flex-center" style={{ alignItems: 'flex-start' }}>
          <p className="slide-description">SHA's AI-driven PMT for informal sector premiums poses critical actuarial risks through flawed algorithmic execution:</p>
          <div className="grid-2 w-full">
            <div className="card">
              <h3 className="text-amber">1. Asset vs. Liquidity Conflation</h3>
              <p>The algorithm frequently mistakes static assets (e.g., semi-permanent housing) for liquid income. It overestimates the ability of informal workers to pay, equating ownership with available disposable cash.</p>
            </div>
            <div className="card card-red">
              <h3 className="text-red">2. The Algorithmic Penalty</h3>
              <p>The system fails to account for income volatility. Upon estimating a higher income, it rigidly forces the Ksh 300 minimum or 2.75% fee, acting as a regressive penalty on the poor and driving high default rates.</p>
            </div>
          </div>
        </div>
      )
    },
    // 16
    {
      title: "Logistic Regression Output", section: "Data Analysis", badge: "badge-data", icon: <Database size={32} className="text-blue" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <p className="slide-description">Hypothesis Testing Output: The data strictly rejects the Null Hypothesis, proving Affordability mathematically drives defaults.</p>
          <table className="data-table" style={{fontSize: '0.9rem'}}>
            <thead>
              <tr><th>Predictor Variable</th><th>Coefficient (β)</th><th>Standard Error</th><th>Z-value</th><th>Risk Assessment</th></tr>
            </thead>
            <tbody>
              <tr><td>(Intercept)</td><td>-3.786</td><td>0.8250</td><td>4.589</td><td>Baseline</td></tr>
              <tr className="bg-red text-white" style={{backgroundColor: '#fef2f2', color: '#dc2626'}}>
                <td><strong>Affordability Ratio (A)</strong></td><td><strong>14.25</strong></td><td><strong>2.053</strong></td><td><strong>6.938</strong></td><td><strong>High Risk (***)</strong></td>
              </tr>
              <tr><td>Volatility Income (V)</td><td>0.5818</td><td>0.0980</td><td>5.937</td><td>High Risk (***)</td></tr>
              <tr><td>Gross Income (Y)</td><td>-0.000142</td><td>0.000036</td><td>3.898</td><td>High Risk (***)</td></tr>
            </tbody>
          </table>
          <div className="grid-2 mt-2">
            <div className="card" style={{padding:'1rem'}}>
              <h3 className="text-blue">Standard Error (Noise)</h3>
              <p style={{fontSize:'0.9rem'}}>Measures the "noise" or uncertainty. A massive coefficient (14.25) with a low SE (2.053) proves extreme reliability.</p>
            </div>
             <div className="card" style={{padding:'1rem'}}>
              <h3 className="text-blue">Z-Value (Proof)</h3>
              <p style={{fontSize:'0.9rem'}}>Measures how many standard errors the estimate is from zero. Our Z-value of 6.938 (&gt;1.96 threshold) proves this is not random chance.</p>
            </div>
          </div>
        </div>
      )
    },
    // 17
    {
      title: "Micro-Level Stress Testing", section: "Data Analysis", badge: "badge-data", icon: <AlertTriangle size={32} className="text-amber" />,
      content: (
        <div className="flex-center" style={{alignItems: 'flex-start'}}>
          <p className="slide-description">Applying the equations to an agricultural worker earning <span className="math-inline">Y = 8,000</span> (Baseline <span className="math-inline">DI = 1,600</span>).</p>
          <div className="grid-2 w-full">
            <div className="card">
              <h3 className="text-amber">Scenario A: 10% Inflation Shock</h3>
              <p>If basic goods rise 10%, <span className="math-inline">α</span> increases. Leftover cash drops to Ksh 960. The rigid Ksh 300 premium now yields an affordability ratio of <span className="math-inline">A = 31.25%</span>.</p>
              <p className="mt-2 text-sm text-red font-bold">Rational Choice: A family will always rationally choose to buy maize flour for the week rather than pay for health insurance.</p>
            </div>
            <div className="card card-red">
              <h3 className="text-red">Scenario B: 25% Agricultural Drought</h3>
              <p>A bad season cuts gross income to <span className="math-inline">Y = 6,000</span>. Because survival costs do not magically get cheaper during a drought, <span className="math-inline">DI</span> hits exactly <strong>Ksh 0</strong>.</p>
              <p className="mt-2 text-sm text-red font-bold">Outcome: The Logistic curve mathematically guarantees a 100% default rate.</p>
            </div>
          </div>
        </div>
      )
    },
    // 18
    {
      title: "Solvency & Ruin Theory", section: "Data Analysis", badge: "badge-data", icon: <ShieldCheck size={32} className="text-blue" />,
      content: (
        <div className="flex-center">
          <p className="slide-description text-center">To prove the SHIF can survive macroeconomic shocks, we apply the foundational equations of Actuarial Ruin Theory.</p>
          
          <div className="math-block w-full">
            <div style={{marginBottom: '0.5rem'}}>S(t) = Σ L<sub>j</sub></div>
            <div>U(t) = U₀ + Σ C<sub>i</sub> - S(t) - E</div>
            <div className="math-caption">Aggregate Claim Process & Solvency Surplus Condition</div>
          </div>

          <div className="grid-2 mt-2 w-full text-left">
            <div className="card">
              <h3 className="text-blue">Variables</h3>
              <p><span className="math-inline">U(t)</span> = Surplus, <span className="math-inline">U₀</span> = Initial Reserves, <span className="math-inline">S(t)</span> = Aggregate Claims (Liabilities). If <span className="math-inline">U(t) &lt; 0</span>, the fund faces Ruin.</p>
            </div>
            <div className="card card-red">
              <h3 className="text-red">The Loss Ratio (LR)</h3>
              <p>Defined as <span className="math-inline">LR = S(t) / Σ C<sub>i</sub></span>. If the ratio of Claims to Revenue exceeds 100%, systemic failure is imminent.</p>
            </div>
          </div>
        </div>
      )
    },
    // 19
    {
      title: "Historical NHIF Loss Ratio (2016-2024)", section: "Data Analysis", badge: "badge-data", icon: <LineChart size={32} className="text-red" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center">The pool was mathematically deteriorating <em>prior</em> to the transition, leaving zero safety margin (<span className="math-inline">U₀</span>) to absorb the informal sector.</p>
          <div className="card chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={lossRatioData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Financial Year', position: 'bottom', offset: 5 }} />
                <YAxis domain={[70, 100]} label={{ value: 'Loss Ratio %', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <ReferenceLine y={93.63} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Critical Threshold (93.6%)' }} />
                <Line type="monotone" dataKey="Ratio" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: '#0f172a' }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    // 20
    {
      title: "ARIMA Baseline Forecast (2024-2029)", section: "Data Analysis", badge: "badge-data", icon: <LineChart size={32} className="text-purple" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center">Using ARIMA(0,1,0), we established the baseline "Status Quo" trajectory for Revenues vs Claims before any transition shocks are applied.</p>
          <div className="card chart-container" style={{ flexGrow: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={arimaData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Forecast Year', position: 'bottom', offset: 5 }} />
                <YAxis label={{ value: 'Ksh Millions', angle: -90, position: 'insideLeft' }} domain={[65000, 90000]} />
                <Tooltip formatter={(value) => `Ksh ${value.toLocaleString()} M`} />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Claims" stroke="#ef4444" strokeWidth={4} strokeDasharray="5 5" dot={{ r: 4 }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    // 21
    {
      title: "Interactive: Year 1 Solvency Stress Test", section: "Data Analysis", badge: "badge-data", icon: <Sliders size={32} className="text-amber" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center" style={{marginBottom: '0.5rem'}}>Applying deterministic shocks (Defaults & Moral Hazard) to the ARIMA baseline to solve for <span className="math-inline">U(t)</span>.</p>
          
          <div className="controls-panel" style={{marginBottom: '0.5rem'}}>
            <div className="control-group">
              <label><span>Premium Attrition Rate (%)</span><span className="text-red">{attritionRate}%</span></label>
              <input type="range" min="0" max="50" step="5" value={attritionRate} onChange={(e) => setAttritionRate(Number(e.target.value))} className="control-slider" />
              <span style={{fontSize:'0.7rem', color:'#64748b'}}>Derived from 78% uninsured national data.</span>
            </div>
            <div className="control-group">
              <label><span>Moral Hazard Claim Spike (%)</span><span className="text-red">{moralHazard}%</span></label>
              <input type="range" min="0" max="50" step="5" value={moralHazard} onChange={(e) => setMoralHazard(Number(e.target.value))} className="control-slider" />
              <span style={{fontSize:'0.7rem', color:'#64748b'}}>Models the proven utilization spike upon access.</span>
            </div>
          </div>

          <div className="grid-2" style={{ flexGrow: 1, gap: '1rem' }}>
            <div className="card chart-container" style={{height: '100%', padding: '1rem'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dynamicSolvencyData.chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Ksh ${value}M`} />
                  <Bar dataKey="Value">
                    {dynamicSolvencyData.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-center" style={{ gap: '0.5rem', height: '100%', justifyContent: 'flex-start' }}>
              <div className={`card w-full text-center ${dynamicSolvencyData.lossRatio > 100 ? 'card-red' : 'card-green'}`} style={{padding:'1rem'}}>
                <h3>Projected Loss Ratio (<span className="math-inline">LR</span>)</h3>
                <div className={`metric-highlight ${dynamicSolvencyData.lossRatio > 100 ? 'text-red' : 'text-green'}`}>
                  {dynamicSolvencyData.lossRatio.toFixed(1)}%
                </div>
                <p style={{fontWeight:'bold', fontSize:'0.85rem'}}>{dynamicSolvencyData.lossRatio > 100 ? 'Ruin Condition Met' : 'Solvent'}</p>
              </div>
              <div className={`card w-full text-center ${dynamicSolvencyData.deficit < 0 ? 'card-red' : 'card-green'}`} style={{padding:'1rem'}}>
                <h3>Operating Balance (<span className="math-inline">U(t)</span>)</h3>
                <div className={`metric-highlight ${dynamicSolvencyData.deficit < 0 ? 'text-red' : 'text-green'}`}>
                  Ksh {dynamicSolvencyData.deficit.toFixed(0)} M
                </div>
                <p style={{fontSize:'0.85rem'}}>Starting Reserves: Ksh 4,648 M</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // 22
    {
      title: "The Proposed Solution: APPM", section: "The Proposed APPM", badge: "badge-appm", icon: <Lightbulb size={32} className="text-green" />,
      content: (
        <div className="flex-center">
          <p className="slide-description text-center">To prevent structural ruin, we propose replacing the rigid statutory floor with an algorithmic equation: the <strong>Adjusted Progressive Premium Model (APPM)</strong>.</p>
          
          <div className="math-block w-full" style={{ maxWidth: '600px' }}>
            <div>C<sub>i</sub> = (Y<sub>i</sub> × R<sub>t</sub>) - S<sub>i</sub></div>
            <div className="math-caption">APPM Algorithmic Patch</div>
          </div>

          <ul className="list-layout w-full mt-2">
            <li className="list-item">
              <span className="list-icon text-blue font-bold text-xl"><span className="math-inline">Y<sub>i</sub></span></span>
              <span><strong>AI-Predicted Proxy Income:</strong> PMT algorithm is a fallback tool used exclusively for the informal sector.</span>
            </li>
            <li className="list-item">
              <span className="list-icon text-purple font-bold text-xl"><span className="math-inline">R<sub>t</sub></span></span>
              <span><strong>Algorithmic Tiered Rate:</strong> Progressive percentage rate programmed into the system based on socio-economic class.</span>
            </li>
            <li className="list-item">
              <span className="list-icon text-green font-bold text-xl"><span className="math-inline">S<sub>i</sub></span></span>
              <span><strong>Indigent Trigger:</strong> A state solidarity subsidy. Automatically triggered (<span className="math-inline">S<sub>i</sub> = Y<sub>i</sub> × R<sub>t</sub></span>) for households below Ksh 10,909, zeroing their out-of-pocket cost.</span>
            </li>
          </ul>
        </div>
      )
    },
    // 23
    {
      title: "Interactive: APPM Income Simulator", section: "The Proposed APPM", badge: "badge-appm", icon: <Sliders size={32} className="text-green" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center" style={{marginBottom: '1rem'}}>Slide to test how the APPM dynamically adjusts the final payment based on gross income.</p>
          
          <div className="controls-panel">
            <div className="control-group">
              <label><span>Simulate Gross Income (Y<sub>i</sub>)</span><span className="text-blue">Ksh {appmIncome.toLocaleString()}</span></label>
              <input type="range" min="2000" max="60000" step="1000" value={appmIncome} onChange={(e) => setAppmIncome(Number(e.target.value))} className="control-slider" />
            </div>
          </div>

          <div className="grid-2 w-full mt-4" style={{ flexGrow: 1 }}>
            <div className="card text-center" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <h3 className="text-purple">Assigned Socio-Economic Tier</h3>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#7c3aed'}}>Tier {simTier}</div>
              <p className="mt-2 text-lg">Applied Rate (R<sub>t</sub>): <strong>{simRt}%</strong></p>
            </div>
            
            <div className="grid-2" style={{gap: '1rem'}}>
               <div className="card card-blue text-center flex-center" style={{padding:'1rem'}}>
                  <h3>State Subsidy (S<sub>i</sub>)</h3>
                  <div className="metric-highlight text-blue">Ksh {simSi.toFixed(0)}</div>
                  {simTier === 1 && <p style={{fontSize:'0.85rem'}}>Full 100% absorption active.</p>}
               </div>
               <div className={`card text-center flex-center ${simPayment === 0 ? 'card-green' : 'card-red'}`} style={{padding:'1rem'}}>
                  <h3>Final Payment (C<sub>i</sub>)</h3>
                  <div className={`metric-highlight ${simPayment === 0 ? 'text-green' : 'text-red'}`}>
                    Ksh {simPayment.toFixed(0)}
                  </div>
                  {simPayment === 0 && <p style={{fontSize:'0.85rem'}}>Zero out-of-pocket burden.</p>}
               </div>
            </div>
          </div>
        </div>
      )
    },
    // 24
    {
      title: "APPM Impact on ARIMA Solvency", section: "The Proposed APPM", badge: "badge-appm", icon: <Target size={32} className="text-blue" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center">How does the APPM fix the baseline ARIMA forecast trajectory?</p>
          <div className="card card-green text-center">
            <h3 className="text-green">ARIMA Trajectory Stabilization</h3>
            <p>By capping upper-tier rates at 2.75% and subsidizing Tier 1, the APPM <strong>neutralizes the massive attrition shock</strong> previously projected in the baseline ARIMA. It prevents exponential divergence of claims, ensuring the fund maintains <span className="math-inline">U(t) &gt; 0</span> over the 5-year window.</p>
          </div>
          <table className="data-table mt-4" style={{fontSize:'1rem'}}>
            <thead><tr><th>Tier</th><th>Income Range</th><th>Rate (<span className="math-inline">R<sub>t</sub></span>)</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>Tier 1</strong></td><td>Below Ksh 10,909</td><td>1.00%</td><td>Covered by the <span className="math-inline">S<sub>i</sub></span> state subsidy.</td></tr>
              <tr><td><strong>Tier 2</strong></td><td>Ksh 10,909 - 19,999</td><td>1.50%</td><td>Protects low-income households from default.</td></tr>
              <tr><td><strong>Tier 3</strong></td><td>Ksh 20,000 - 49,999</td><td>2.00%</td><td>Gradual scaling for middle earners.</td></tr>
              <tr><td><strong>Tier 4</strong></td><td>Ksh 50,000+</td><td>2.75%</td><td>Parity with formal sector rates.</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    // 25
    {
      title: "Graph: Projected Loss Ratio After Shocks", section: "The Proposed APPM", badge: "badge-appm", icon: <BarChart3 size={32} className="text-green" />,
      content: (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <p className="slide-description text-center">A direct visual comparison of the mathematical Year 1 Loss Ratio after the macroeconomic shocks are applied.</p>
          <div className="card chart-container" style={{ flexGrow: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postShockLossRatioData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Year 1 Loss Ratio (%)', angle: -90, position: 'insideLeft' }} domain={[0, 160]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <ReferenceLine y={100} label="Insolvency Point (100%)" stroke="#000" strokeDasharray="5 5" strokeWidth={2} />
                <Bar dataKey="LossRatio" label={{ position: 'top', formatter: (val) => `${val}%` }}>
                  {
                    postShockLossRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    // 26
    {
      title: "Actionable Recommendations", section: "The Proposed APPM", badge: "badge-appm", icon: <CheckCircle2 size={32} className="text-blue" />,
      content: (
        <div className="grid-2">
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '50%', fontWeight: 'bold' }}>1</div>
            <div>
              <h3>Adopt Tiered Subsidies</h3>
              <p>Execute the APPM patch to mathematically eliminate the regressive tax spike on Tier 1 earners.</p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '50%', fontWeight: 'bold' }}>2</div>
            <div>
              <h3>Leverage Intermediaries</h3>
              <p>Buffer income volatility (<span className="math-inline">V<sub>i</sub></span>) by integrating collections with local Microfinance tools and Chamas.</p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '50%', fontWeight: 'bold' }}>3</div>
            <div>
              <h3>Restore Expected Utility</h3>
              <p>Ensure immediate utility by removing restrictive 90-day waiting periods that deter voluntary compliance.</p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '50%', fontWeight: 'bold' }}>4</div>
            <div>
              <h3>Diversify Funding</h3>
              <p>Shift toward consumption-based taxes (VAT) to fund the <span className="math-inline">S<sub>i</sub></span> solidarity subsidies, improving macro-solvency resilience.</p>
            </div>
          </div>
        </div>
      )
    },
    // 27
    {
      title: "Key References", section: "References", badge: "badge-lit", icon: <BookOpen size={32} className="text-purple" />,
      content: (
        <div className="flex-center" style={{ alignItems: 'flex-start', height: '100%' }}>
          <p className="slide-description">Key academic, statutory, and empirical references supporting the actuarial modeling and regional comparative analysis.</p>
          
          <div className="card w-full" style={{ overflowY: 'auto', maxHeight: '550px', padding: '2rem' }}>
            <ol className="list-layout" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', fontSize: '0.95rem', gap: '0.85rem' }}>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Agyepong, I. A., et al. (2020)</strong> - Implementation of the NHIS in Ghana: Successes and challenges.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Akerlof, G. A. (1970)</strong> - The market for "lemons": Quality uncertainty and the market mechanism.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Arrow, K. J. (1963)</strong> - Uncertainty and the welfare economics of medical care.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Blanchet, N. J., Fink, G., & Osei-Akoto, I. (2012)</strong> - The effect of Ghana's NHIS on healthcare utilisation.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Kenya National Bureau of Statistics (2023)</strong> - Economic Survey 2023.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Logie, D. E., Rowson, M., & Ndagije, F. (2008)</strong> - Innovations in Rwanda's health system: Looking to the future.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Republic of Kenya (2023)</strong> - The Social Health Insurance Act, No. 16 of 2023.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Rothschild, M., & Stiglitz, J. (1976)</strong> - Equilibrium in competitive insurance markets.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>Wamalwa, P. N., et al. (2025)</strong> - Assessing inequalities and determinants of national health insurance enrolment among informal sector workers in Kenya.
              </li>
              <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <strong>World Health Organization (2010)</strong> - Health systems financing: The path to universal coverage.
              </li>
            </ol>
          </div>
        </div>
      )
    }
  ];

  // Navigation handlers
  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) setCurrentSlideIndex(prev => prev + 1);
  };
  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(prev => prev - 1);
  };

  const slide = slides[currentSlideIndex];
  const progressPercentage = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="app-wrapper">
      <div className="presentation-deck">
        
        {/* Header */}
        <header className="slide-header">
          <div className="header-title-wrapper">
            {slide.type !== 'title' && slide.icon}
            <div style={{display:'flex', flexDirection:'column'}}>
               {slide.section && <span className={`section-badge ${slide.badge}`}>{slide.section}</span>}
               <h2 className="header-title">{slide.type !== 'title' ? slide.title : 'University of Nairobi'}</h2>
            </div>
          </div>
          <div className="slide-counter">
            SLIDE {currentSlideIndex + 1} OF {slides.length}
          </div>
        </header>

        {/* Content Area */}
        <main className="slide-content">
          {slide.content}
        </main>

        {/* Footer & Progress */}
        <footer className="slide-footer">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="footer-controls">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="nav-btn btn-prev"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="nav-btn btn-next"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}