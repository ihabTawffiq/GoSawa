import React, { useState, useEffect } from "react";

import config from "../../../server/config";

const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const CaptainProfile = (props) => {
  const id = props.match.params.id;
  const [captainProfile, setCaptainProfile] = useState(null);
  useEffect(async () => {
    firestore
      .collection("captains")
      .doc(id)
      .get()
      .then((data) => {
        console.log({ ...data.data() });
        setCaptainProfile({ ...data.data() });
      });
  }, [id]);
  if (captainProfile) {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h3>Captain profile</h3>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h3>Loding Captain profile</h3>
      </div>
    );
  }
};

export default CaptainProfile;
