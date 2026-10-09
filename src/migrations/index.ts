import * as migration_20260925_072710_initial_schema from './20260925_072710_initial_schema';
import * as migration_20261006_030325_add_inquiries from './20261006_030325_add_inquiries';
import * as migration_20261006_033403_add_inquiry_fields from './20261006_033403_add_inquiry_fields';
import * as migration_20261006_072100_add_internal_note from './20261006_072100_add_internal_note';
import * as migration_20261006_074640_contact_options from './20261006_074640_contact_options';
import * as migration_20261006_100654_localization_posts from './20261006_100654_localization_posts';
import * as migration_20261008_094035_products_detail from './20261008_094035_products_detail';
import * as migration_20261009_081159_products_home from './20261009_081159_products_home';

export const migrations = [
  {
    up: migration_20260925_072710_initial_schema.up,
    down: migration_20260925_072710_initial_schema.down,
    name: '20260925_072710_initial_schema',
  },
  {
    up: migration_20261006_030325_add_inquiries.up,
    down: migration_20261006_030325_add_inquiries.down,
    name: '20261006_030325_add_inquiries',
  },
  {
    up: migration_20261006_033403_add_inquiry_fields.up,
    down: migration_20261006_033403_add_inquiry_fields.down,
    name: '20261006_033403_add_inquiry_fields',
  },
  {
    up: migration_20261006_072100_add_internal_note.up,
    down: migration_20261006_072100_add_internal_note.down,
    name: '20261006_072100_add_internal_note',
  },
  {
    up: migration_20261006_074640_contact_options.up,
    down: migration_20261006_074640_contact_options.down,
    name: '20261006_074640_contact_options',
  },
  {
    up: migration_20261006_100654_localization_posts.up,
    down: migration_20261006_100654_localization_posts.down,
    name: '20261006_100654_localization_posts',
  },
  {
    up: migration_20261008_094035_products_detail.up,
    down: migration_20261008_094035_products_detail.down,
    name: '20261008_094035_products_detail',
  },
  {
    up: migration_20261009_081159_products_home.up,
    down: migration_20261009_081159_products_home.down,
    name: '20261009_081159_products_home'
  },
];
