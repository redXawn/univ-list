/* istanbul ignore file */

import { openDB } from "idb";

export const getIdb = async () => {
  const indexedDB = await openDB("univ_db", 1, {
    upgrade(db) {
      db.createObjectStore("univDetail", {
        keyPath: "name",
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
