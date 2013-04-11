# ProfileVis Compare

The goal of this visualization is to indicate which of the items that have been rated very highly by the two users, these users have in common.

To use this visualization, you'll need a datasource to plug into the visualization, as shown in the following example code that uses a JSON file :

```javascript

d3.json("data/json/profiles.json", function(error, data) {
    var dataset = {};
    alert(data);
    data.items.forEach(function(item) {
        dataset[item.name] = item;
    });
    var user = data.users.user;
    var active_user = data.users.active_user;
    buildVisualization(dataset, user, active_user);
});

```
