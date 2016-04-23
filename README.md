
##API

```javascript 
const Vote = require("./");

Vote.reset();
Vote.resetField(field);

Vote.for(field, candidateId);

Vote.save():
Vote.load();

Vote.createCandidate(field , candidate);
Vote.getAllFiled();
Vote.getCandidates(field);
Vote.getRanck(field , candidate)
```