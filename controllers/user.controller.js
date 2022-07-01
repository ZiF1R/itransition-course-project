/* eslint-disable camelcase */
"use strict";

const { Users } = require("../db/db");

class UserController {
  async login(req, res) {
    const { email, password } = this.getDataFromUrl(req.url);

    const user = await Users.findOne({
      where: { email, password }
    });

    if (user === null) {
      res.status(400);
      res.end("User not found!");
    } else {
      await this.updateUserLastVisit(user);
      res.json({ user });
    }
  }

  getDataFromUrl(baseUrl) {
    const url = new URL(baseUrl, "http://sample.url/");
    const email = url.searchParams.get("email");
    const password = url.searchParams.get("password");

    return { email, password };
  }

  async updateUserLastVisit(user) {
    await Users.update(
      {
        last_visit: new Date()
      },
      {
        where: {
          id: user.id
        }
      }
    );
  }

  async createUser(req, res) {
    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    const isExistingEmail =
      (await Users.findOne({ where: { email } })) !== null;

    if (isExistingEmail) {
      res.status(400);
      res.end("Users with such email already exist!");
    } else {
      const user = await Users.create({
        first_name,
        last_name,
        email,
        password,
        is_blocked: false,
        is_admin: false,
        created_date: new Date(),
        last_visit: null
      });

      res.json(user);
    }
  }
}

module.exports = new UserController();
