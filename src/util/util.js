export const isJson = (input) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return false;
  }
};

export const formatAMPMToday = () => {
  const date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime + ", Today";
};

export const mapResponse = (watsonResponse) => {
  const response = watsonResponse.result.output.generic;
  let info_view = {};
  const mappedResp = response.map((watsonresp) => {
    let type = watsonresp.response_type;
    let msg = watsonresp;
    //console.log("response", msg);
    let time = formatAMPMToday();
    if (
      (type === "file" || type === "video") &&
      Object.keys(info_view).length === 0
    ) {
      info_view = {
        url: msg.url,
        type: type,
      };
    }
    return {
      from: "bot",
      type,
      msg: { ...msg, time },
    };
  });
  return [mappedResp, info_view];
};

export const mapUserInputs = (input) => {
  return {
    from: "user",
    type: "text",
    msg: input,
    time: formatAMPMToday(),
  };
};

export const mapInfoStates = (type, url) => {
  return {
    url: url,
    type: type,
    from: "bot",
  };
};
