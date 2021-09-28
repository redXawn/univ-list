/* istanbul ignore file */

import { openDB } from "idb";
import jwt from "jsonwebtoken";

export const getIdb = async () => {
  const indexedDB = await openDB("univ_db", 1, {
    upgrade(db) {
      db.createObjectStore("univDetail", {
        keyPath: "name",
      });
      db.createObjectStore("userList", {
        keyPath: "registerDate",
      });
      db.createObjectStore("userFavorite", {
        keyPath: "email",
      });
    },
  });
  return indexedDB;
};

export const saveEmailSubscription = async (univData, emailSubscribe) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("univDetail");
  const findUniv = existingDetail.find((data) => data.name === univData.name);
  const newEmail = [{ email: emailSubscribe }];
  const currentEmailList = findUniv && findUniv.emailSubscription ? findUniv.emailSubscription : [];
  let newData = {
    name: univData.name,
    emailSubscription: [...currentEmailList, ...newEmail],
  };
  db.put("univDetail", newData);
};

export const checkEmailSubscription = async (name, email) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("univDetail");
  const findUniv = existingDetail.find((data) => data.name === name);
  if (findUniv) {
    const findEmail = findUniv.emailSubscription.find((data) => data.email === email);
    return findEmail ? true : false;
  }
  return false;
};

export const getAllUnivWithSubscription = async (name) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("univDetail");
  return existingDetail;
};

export const registerUser = async (userData) => {
  const db = await getIdb();
  const registerDate = new Date().getTime();

  return jwt.sign(newUser, "secret");
};

export const checkUserEmailRegister = async (email) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("userList");
  const findEmail = existingDetail.find((data) => data.email === email);
  return findEmail ? true : false;
};

export const loginUser = async (userData) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("userList");
  const findEmail = existingDetail.find((data) => data.email === userData.email);
  return findEmail ? jwt.sign(findEmail, "secret") : false;
};

export const addFavoriteUniv = async (userEmail, univName) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("userFavorite");
  const findUser = existingDetail.find((data) => data.email === userEmail);
  if (findUser) {
    const findUniv = findUser.listFavorite.find((data) => data.name === univName);
    if (!findUniv) {
      const newFavorite = [{ name: univName }];
      const favorite = {
        email: userEmail,
        listFavorite: [...findUser.listFavorite, ...newFavorite],
      };
      db.put("userFavorite", favorite);
    } else {
      const unfavorite = findUser.listFavorite.filter((data) => data.name !== univName);
      const newData = {
        email: userEmail,
        listFavorite: unfavorite,
      };
      db.put("userFavorite", newData);
    }
  } else {
    return false;
  }
};

export const getUser = async (userEmail) => {
  const db = await getIdb();
  const existingDetail = await db.getAll("userFavorite");
  const findUser = existingDetail.find((data) => data.email === userEmail);
  if (findUser) {
    return findUser;
  }
  return [];
};
