import config from '@payload-config'
import { getPayload } from 'payload'

const o = (value: string, en: string, fr: string, es: string) =>
  ({ value, labelEn: en, labelFr: fr, labelEs: es, active: true })

const payload = await getPayload({ config })
await payload.updateGlobal({
  slug: 'contact-options',
  data: {
    productOptions: [
      o('film-faced', 'Film Faced Plywood', 'Contreplaqué filmé', 'Contrachapado fenólico'),
      o('anti-slip', 'Anti-Slip Plywood', 'Contreplaqué antidérapant', 'Contrachapado antideslizante'),
      o('raw', 'Raw Plywood', 'Contreplaqué brut', 'Contrachapado en bruto'),
      o('lvl', 'LVL', 'LVL', 'LVL'),
      o('other', 'Other', 'Autre', 'Otro'),
    ],
    quantityOptions: [
      o('lt1', 'Less than 1 container', 'Moins d’1 conteneur', 'Menos de 1 contenedor'),
      o('1-3', '1 – 3 containers', '1 à 3 conteneurs', '1 a 3 contenedores'),
      o('3-10', '3 – 10 containers', '3 à 10 conteneurs', '3 a 10 contenedores'),
      o('gt10', 'More than 10 containers', 'Plus de 10 conteneurs', 'Más de 10 contenedores'),
    ],
    incotermOptions: [
      o('FOB', 'FOB', 'FOB', 'FOB'), o('CIF', 'CIF', 'CIF', 'CIF'),
      o('CFR', 'CFR', 'CFR', 'CFR'), o('EXW', 'EXW', 'EXW', 'EXW'),
    ],
    timingOptions: [
      o('asap', 'As soon as possible', 'Dès que possible', 'Lo antes posible'),
      o('30d', 'Within 30 days', 'Sous 30 jours', 'En 30 días'),
      o('60d', 'Within 60 days', 'Sous 60 jours', 'En 60 días'),
      o('planning', 'Planning stage', 'En phase de réflexion', 'En fase de planificación'),
    ],
  },
})
console.log('Seeded contact options')
process.exit(0)