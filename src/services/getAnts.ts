export default (callback: (ants: any) => void) => {
    fetch("ants.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        callback(myJson.ants);
      });
  };