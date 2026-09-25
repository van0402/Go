// const steps = [
//   { n: '01', icon: '◌', label: 'Raw Material' },
//   { n: '02', icon: '≈', label: 'Drying' },
//   { n: '03', icon: '≋', label: 'Gluing & Lay-up' },
//   { n: '04', icon: '▰', label: 'Hot Press' },
//   { n: '05', icon: '◇', label: 'Cutting & Sanding' },
//   { n: '06', icon: '▦', label: 'Surface Finishing' },
//   { n: '07', icon: '✓', label: 'Quality Control' },
//   { n: '08', icon: '▣', label: 'Packing' },
//   { n: '09', icon: '→', label: 'Global Shipping' },
// ]

// export function ProcessSteps() {
//   return (
//     <section id="process">
//       <div className="container-fluid">
//         <div className="container process reveal">
//           <div className="section-kicker" style={{ color: '#D7B9A0' }}>
//             04 · Production Process
//           </div>
//           <h2>From veneer to global delivery.</h2>
//           <div className="steps">
//             {steps.map((step) => (
//               <div className="step" key={step.n}>
//                 <span>{step.n}</span>
//                 <i>{step.icon}</i>
//                 <b>{step.label}</b>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }