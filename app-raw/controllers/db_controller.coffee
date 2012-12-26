
apiKey = "apiKey=50b9ed0fe4b0afba6ecc5836"
"https://api.mongolab.com/api/1/databases/card-fight-club/collections/magic-cards?"+apiKey


$.ajax( { url: "https://api.mongolab.com/api/1/databases/xxx/collections/xx?apiKey=xxx",
          data: JSON.stringify( [ { "x" : 2,"c1" : 34,"c2" : getUrlVars()["c2"]} ] ),
          type: "POST",
          contentType: "application/json" } );


$.ajax( { url: "https://api.mongolab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
          data: JSON.stringify( { "x" : 1 } ),
          type: "POST",
          contentType: "application/json" } );