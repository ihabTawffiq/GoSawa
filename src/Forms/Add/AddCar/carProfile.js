import React, { useState, useEffect } from "react";
import config from "../../../server/config";

const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const CarProfile = (props) => {
  const id = props.match.params.id;
  const [carProfile, setCarProfile] = useState(null);
  useEffect(async () => {
    firestore
      .collection("cars")
      .doc(id)
      .get()
      .then((doc) => {
        setCarProfile({ ...doc.data() });
      });
  }, [id]);
  if (carProfile) {
    console.log(carProfile);
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h3> Car Profile</h3>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h3>Loding Carprofile</h3>
      </div>
    );
  }
};

export default CarProfile;
