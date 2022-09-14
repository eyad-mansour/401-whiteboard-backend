"use strict";

class userCommentRoutes {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      console.error("error while creating");
    }
  }

  async read(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (error) {
      console.error("error while reading");
    }
  }
  async update(id, obj) {
    try {
      const dataByID = await this.model.findOne({ where: { id } });
      return await dataByID.update(obj);
    } catch (error) {
      console.error(`error while updating data in ${id}`);
    }
  }

  async delete(id) {
    try {
      return await this.model.destroy({ where: { id } });
    } catch (error) {
      console.error(`error while deleteing with id: ${id}`);
    }
  }

  async readWithComment(Comment) {
    try {
      return await this.model.findAll({ include: [Comment] });
    } catch (error) {
      console.error(`error while reading comments `);
    }
  }
}

module.exports = userCommentRoutes;
