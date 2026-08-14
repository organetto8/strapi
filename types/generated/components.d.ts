import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectNote extends Struct.ComponentSchema {
  collectionName: 'components_project_notes';
  info: {
    description: "Testo in markdown mostrato nel finto Notes del Mac e nella scheda info dell'iPhone";
    displayName: 'Note';
    icon: 'file';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.note': ProjectNote;
    }
  }
}
