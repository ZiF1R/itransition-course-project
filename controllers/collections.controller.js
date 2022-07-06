/* eslint-disable camelcase */
"use strict";

const {
  OptionalFieldTypes,
  Collections,
  CollectionOptionalFields,
  Items,
  ItemOptionalFields,
  ItemTags,
  Likes,
  Comments
} = require("../db/db");

class CollectionsController {
  async getOptionalFieldTypes(req, res) {
    const types = await OptionalFieldTypes.findAll();
    res.json({ types });
  }

  async createCollection(req, res) {
    const {
      name,
      user_id,
      topic_id,
      description,
      optionalFields
    } = req.body;

    const collection = await Collections.create({
      name,
      description,
      image_link: null,
      created_date: new Date(),
      user_id,
      topic_id,
    });

    for (const { name, type_id } of optionalFields) {
      await CollectionOptionalFields.create({
        name,
        collection_id: collection.id,
        type_id,
      });
    }

    res.json({ collection });
  }

  async getCollections(req, res) {
    const url = new URL(req.url, "https://baseurl.com/");
    const user_id = +url.searchParams.get("user_id");

    let collections = [];
    if (user_id) {
      collections = await await Collections.findAll({
        where: { user_id }
      });
    } else {
      collections = await Collections.findAll();
    }

    res.json({ collections });
  }

  async removeCollection(req, res) {
    const id = +req.params.id;

    await this.removeCollectionItems(id);
    await this.removeCollectionOptionalFields(id);

    await Collections.destroy({
      where: { id }
    });

    res.status(200);
    res.end();
  }

  async removeCollectionItems(id) {
    const collectionItems = await Items.findAll({
      where: {
        collection_id: id
      }
    });

    for (const item of collectionItems) {
      await this.removeItem(item.id);
    }
  }

  async removeItem(item_id, collection_id) {
    const relatedTables = [
      ItemOptionalFields,
      ItemTags,
      Likes,
      Comments
    ];

    for (const relatedTable of relatedTables) {
      await relatedTable.destroy({
        where: { item_id }
      });
    }

    await Items.destroy({
      where: { collection_id }
    });
  }

  async removeCollectionOptionalFields(id) {
    await CollectionOptionalFields.destroy({
      where: {
        collection_id: id
      }
    });
  }

  async getCollectionOptionalFields(req, res) {
    const collection_id = +req.params.collection_id;

    const fields = await CollectionOptionalFields.findAll({
      where: { collection_id }
    });

    res.json({ fields });
  }

  async editCollection(req, res) {
    const {
      id,
      name,
      description,
      image_link,
      topic_id,
      optionalFields
    } = req.body;

    await this.editOptionalFields(id, optionalFields);

    const collection = await Collections.update({
      name,
      description,
      topic_id,
      image_link
    },
    {
      where: { id }
    });

    res.json({ collection });
  }

  async editOptionalFields(collection_id, optionalFields) {
    const dbFields = await CollectionOptionalFields.findAll({
      where: { collection_id }
    });
    const newFields = optionalFields.filter(field => !field.id);

    for (const field of dbFields) {
      const collectionField = optionalFields.find(f => f.id === field.id);
      if (collectionField) {
        field.name = collectionField.name;
        field.type_id = collectionField.type_id;
      } else {
        await CollectionOptionalFields.destroy({
          where: { id: field.id }
        });
      }
    }

    for (const newField of newFields) {
      await CollectionOptionalFields.create({
        name: newField.name,
        collection_id,
        type_id: newField.type_id,
      });
    }
  }
}

module.exports = new CollectionsController();
