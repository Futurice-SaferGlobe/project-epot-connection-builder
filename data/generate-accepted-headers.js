const operation = require('./epon-dummy.json')[0].data;
const template = '"%s",';

operation.forEach(header => {
    console.log(template, header.uid);
    header.subheaders.forEach(subheader => {
      console.log(template, subheader.uid);
    });
});
