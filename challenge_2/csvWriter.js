
const csvWriter = {

  getChildObjects : (object) => {
    //takes an object
    let objArray = [];
    //creates an array
    let tempObj = {};
    //let children = object.children
    for (var key in object) {
      if (key !== 'children') {
        tempObj[key] = object[key];
      }
    }
    objArray.push(tempObj);
    if(object['children']) {
      for (let child of object['children']) {
        objArray = objArray.concat(getChildObjects(child))
      }
    }

    //pushes all objects in the 'children' property of said object into the array
    //by going through all the keys and adding them to the temp object, then pushes them into the objarray
    //iteratively going through all the children objects and adding them and their children to the array as well
    //then returns the array
    return objArray;
  },

  convertToCSVString : (jsonObject) => {
    //takes in an object that looks like the sample report
    //then writes to a CSV file
    //the keys are the first line of the csv file, all separated by commas
    //the "children" property denotes a new object - only the keys of the very first object will be stored in the first line of the CSV file
    //the "children" property will not be stored as a value in the key line of the CSV file
    let objectArray = csvWriter.getChildObjects(jsonObject);
    let columnData = [];

    for (let key in jsonObject) {
      if(key !== 'children') {
        columnData.push(key);
      }
    }
    let CSVString = columnData.join();

    for (let object of objectArray) {
      let CSVDataLineArray = [];
      for (let key in object) {
        CSVDataLineArray.push(object[key]);
      }
      CSVString += '\n' + CSVDataLineArray.join()
    }

    return CSVString;
  }

}



const testObj = {
  "firstName": "Joshie",
  "lastName": "Wyattson",
  "county": "San Mateo",
  "city": "San Mateo",
  "role": "Broker",
  "sales": 1000000,
  "children": [
  {
    "firstName": "Beth Jr.",
    "lastName": "Johnson",
    "county": "San Mateo",
    "city": "Pacifica",
    "role": "Manager",
    "sales": 2900000,
    "children": [
      {
        "firstName": "Smitty",
        "lastName": "Won",
        "county": "San Mateo",
        "city": "Redwood City",
        "role": "Sales Person",
        "sales": 4800000,
        "children": []
      },
      {
        "firstName": "Allen",
        "lastName": "Price",
        "county": "San Mateo",
        "city": "Burlingame",
        "role": "Sales Person",
        "sales": 2500000,
        "children": []
      }
    ]
  },
  {
    "firstName": "Beth",
    "lastName": "Johnson",
    "county": "San Francisco",
    "city": "San Francisco",
    "role": "Broker/Sales Person",
    "sales": 7500000,
    "children": []
  }
]
};

module.exports = csvWriter;

//const test1 = getChildObjects(testObj);
//console.log(JSON.stringify(test1));

//const test2 = convertToCSVString(testObj);
//console.log(test2);