import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuildingBuilding extends Schema.CollectionType {
  collectionName: 'buildings';
  info: {
    singularName: 'building';
    pluralName: 'buildings';
    displayName: 'Buildings';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bld_levels: Attribute.String;
    shops: Attribute.String;
    flats: Attribute.String;
    offices: Attribute.String;
    swimming_pools: Attribute.String;
    elevators: Attribute.String;
    actual_area: Attribute.String;
    property_type_id: Attribute.BigInteger;
    property_type_ar: Attribute.String;
    property_type_en: Attribute.String;
    property_sub_type_id: Attribute.BigInteger;
    property_sub_type_ar: Attribute.String;
    property_sub_type_en: Attribute.String;
    parent_property_id: Attribute.BigInteger;
    creation_date: Attribute.DateTime;
    parcel_id: Attribute.BigInteger;
    is_free_hold: Attribute.Boolean;
    property_id: Attribute.BigInteger;
    area_id: Attribute.BigInteger;
    zone_id: Attribute.BigInteger;
    area_name_ar: Attribute.String;
    area_name_en: Attribute.String;
    land_number: Attribute.String;
    land_sub_number: Attribute.String;
    building_number: Attribute.String;
    common_area: Attribute.String;
    actual_common_area: Attribute.String;
    floors: Attribute.String;
    rooms: Attribute.String;
    rooms_ar: Attribute.String;
    rooms_en: Attribute.String;
    car_parks: Attribute.String;
    built_up_area: Attribute.String;
    is_lease_hold: Attribute.Boolean;
    is_registered: Attribute.Boolean;
    pre_registration_number: Attribute.String;
    master_project_id: Attribute.BigInteger;
    master_project_en: Attribute.String;
    master_project_ar: Attribute.String;
    project_id: Attribute.BigInteger;
    project_name_ar: Attribute.String;
    project_name_en: Attribute.String;
    land_type_id: Attribute.BigInteger;
    land_type_ar: Attribute.String;
    land_type_en: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::building.building',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::building.building',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLandLand extends Schema.CollectionType {
  collectionName: 'lands';
  info: {
    singularName: 'land';
    pluralName: 'lands';
    displayName: 'Lands';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    property_id: Attribute.BigInteger & Attribute.Unique;
    area_id: Attribute.BigInteger & Attribute.Unique;
    zone_id: Attribute.BigInteger & Attribute.Unique;
    area_name_ar: Attribute.String;
    area_name_en: Attribute.String;
    land_number: Attribute.String;
    land_sub_number: Attribute.String;
    actual_area: Attribute.String;
    property_type_id: Attribute.BigInteger & Attribute.Unique;
    property_type_ar: Attribute.String;
    property_type_en: Attribute.String;
    property_sub_type_id: Attribute.BigInteger;
    property_sub_type_ar: Attribute.String;
    property_sub_type_en: Attribute.String;
    munc_zip_code: Attribute.String;
    munc_number: Attribute.String;
    parcel_id: Attribute.BigInteger;
    is_free_hold: Attribute.Boolean;
    is_registered: Attribute.Boolean;
    pre_registration_number: Attribute.String;
    separated_from: Attribute.String;
    separated_reference: Attribute.String;
    project_id: Attribute.BigInteger;
    project_name_ar: Attribute.String;
    project_name_en: Attribute.String;
    master_project_id: Attribute.BigInteger;
    master_project_en: Attribute.String;
    master_project_ar: Attribute.String;
    land_type_id: Attribute.BigInteger;
    land_type_ar: Attribute.String;
    land_type_en: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::land.land', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::land.land', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiLocationLocation extends Schema.CollectionType {
  collectionName: 'locations';
  info: {
    singularName: 'location';
    pluralName: 'locations';
    displayName: 'location';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    alias: Attribute.Text;
    arabic_name: Attribute.Text;
    avm_status: Attribute.Integer;
    emirate: Attribute.String;
    latitude: Attribute.Float;
    longitude: Attribute.Float;
    location_id: Attribute.BigInteger & Attribute.Required & Attribute.Unique;
    master_development: Attribute.Text;
    name: Attribute.Text;
    sub_location_1: Attribute.Text;
    sub_location_2: Attribute.Text;
    sub_location_3: Attribute.Text;
    sub_location_4: Attribute.Text;
    sub_location_5: Attribute.Text;
    sub_title: Attribute.Text;
    units: Attribute.Relation<
      'api::location.location',
      'oneToMany',
      'api::unit.unit'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTransactionTransaction extends Schema.CollectionType {
  collectionName: 'transactions';
  info: {
    singularName: 'transaction';
    pluralName: 'transactions';
    displayName: 'Transactions';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    transaction_id: Attribute.BigInteger;
    procedure_id: Attribute.BigInteger;
    trans_group_id: Attribute.BigInteger;
    trans_group_ar: Attribute.String;
    trans_group_en: Attribute.String;
    procedure_name_ar: Attribute.String;
    procedure_name_en: Attribute.String;
    instance_date: Attribute.Date;
    property_type_id: Attribute.BigInteger;
    property_type_ar: Attribute.String;
    property_type_en: Attribute.String;
    property_sub_type_id: Attribute.BigInteger;
    property_sub_type_ar: Attribute.String;
    property_sub_type_en: Attribute.String;
    property_usage_ar: Attribute.String;
    property_usage_en: Attribute.String;
    reg_type_id: Attribute.BigInteger;
    reg_type_ar: Attribute.String;
    reg_type_en: Attribute.String;
    area_id: Attribute.BigInteger;
    area_name_ar: Attribute.String;
    area_name_en: Attribute.String;
    building_name_ar: Attribute.String;
    building_name_en: Attribute.String;
    project_number: Attribute.String;
    project_name_ar: Attribute.String;
    project_name_en: Attribute.String;
    master_project_en: Attribute.String;
    master_project_ar: Attribute.String;
    nearest_landmark_ar: Attribute.String;
    nearest_landmark_en: Attribute.String;
    nearest_metro_ar: Attribute.String;
    nearest_metro_en: Attribute.String;
    nearest_mall_ar: Attribute.String;
    nearest_mall_en: Attribute.String;
    rooms_ar: Attribute.String;
    rooms_en: Attribute.String;
    has_parking: Attribute.Boolean;
    procedure_area: Attribute.String;
    actual_worth: Attribute.String;
    meter_sale_price: Attribute.String;
    rent_value: Attribute.String;
    meter_rent_price: Attribute.String;
    no_of_parties_role_1: Attribute.String;
    no_of_parties_role_2: Attribute.String;
    no_of_parties_role_3: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUnitUnit extends Schema.CollectionType {
  collectionName: 'units';
  info: {
    singularName: 'unit';
    pluralName: 'units';
    displayName: 'unit';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arabic_community: Attribute.Text;
    bathrooms: Attribute.String;
    bedrooms: Attribute.String;
    built_up_area_sqft: Attribute.String;
    built_up_area_sqm: Attribute.String;
    developer_name: Attribute.Text;
    emirate: Attribute.String;
    floor: Attribute.String;
    latitude: Attribute.Float;
    longitude: Attribute.Float;
    master_development: Attribute.Text;
    no_of_parking: Attribute.String;
    parking: Attribute.Text;
    plot_size_sqft: Attribute.String;
    plot_size_sqm: Attribute.String;
    property_id: Attribute.BigInteger;
    property_new_address: Attribute.Text;
    property_type_id: Attribute.BigInteger;
    sub_location_1: Attribute.Text;
    sub_location_2: Attribute.Text;
    sub_location_3: Attribute.Text;
    sub_location_4: Attribute.Text;
    sub_title: Attribute.String;
    total_service_charges: Attribute.String;
    unit_number: Attribute.String;
    views: Attribute.String;
    location_id: Attribute.BigInteger;
    ref_location_id: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiUnitsDldUnitsDld extends Schema.CollectionType {
  collectionName: 'units_dlds';
  info: {
    singularName: 'units-dld';
    pluralName: 'units-dlds';
    displayName: 'Units_dld';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    property_id: Attribute.BigInteger;
    area_id: Attribute.BigInteger;
    zone_id: Attribute.BigInteger;
    area_name_ar: Attribute.String;
    area_name_en: Attribute.String;
    land_number: Attribute.String;
    land_sub_number: Attribute.String;
    building_number: Attribute.String;
    unit_number: Attribute.String;
    unit_balcony_area: Attribute.String;
    unit_parking_number: Attribute.String;
    parking_allocation_type: Attribute.String;
    parking_allocation_type_ar: Attribute.String;
    parking_allocation_type_en: Attribute.String;
    common_area: Attribute.String;
    actual_common_area: Attribute.String;
    floor: Attribute.String;
    rooms: Attribute.String;
    rooms_ar: Attribute.String;
    rooms_en: Attribute.String;
    actual_area: Attribute.String;
    property_type_id: Attribute.BigInteger;
    property_type_ar: Attribute.String;
    property_type_en: Attribute.String;
    property_sub_type_id: Attribute.BigInteger;
    property_sub_type_ar: Attribute.String;
    property_sub_type_en: Attribute.String;
    parent_property_id: Attribute.BigInteger;
    grandparent_property_id: Attribute.BigInteger;
    creation_date: Attribute.DateTime;
    munc_zip_code: Attribute.String;
    munc_number: Attribute.String;
    parcel_id: Attribute.BigInteger;
    is_free_hold: Attribute.Boolean;
    is_lease_hold: Attribute.Boolean;
    is_registered: Attribute.Boolean;
    pre_registration_number: Attribute.String;
    master_project_id: Attribute.BigInteger;
    master_project_en: Attribute.String;
    master_project_ar: Attribute.String;
    project_id: Attribute.BigInteger;
    project_name_ar: Attribute.String;
    project_name_en: Attribute.String;
    land_type_id: Attribute.BigInteger;
    land_type_ar: Attribute.String;
    land_type_en: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::units-dld.units-dld',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::units-dld.units-dld',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::building.building': ApiBuildingBuilding;
      'api::land.land': ApiLandLand;
      'api::location.location': ApiLocationLocation;
      'api::transaction.transaction': ApiTransactionTransaction;
      'api::unit.unit': ApiUnitUnit;
      'api::units-dld.units-dld': ApiUnitsDldUnitsDld;
    }
  }
}
