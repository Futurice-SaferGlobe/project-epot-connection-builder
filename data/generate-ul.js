const operation = require('./epon-dummy.json')[0].data;
const template = '<li><a href="#" data-uid="%s">%s. %s</a></li>';

console.log("<ul>");
operation.forEach(header => {
    console.log(template, header.uid, header.index, header.title);
    console.log("<ul>");
    header.subheaders.forEach(subheader => {
      console.log(template, subheader.uid, header.index+"."+subheader.index, subheader.title);
    });
    console.log("</ul>");
});
console.log("</ul>");
