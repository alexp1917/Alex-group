var models = require('./models');

main()

async function main() {
    // console.log(models);
    // console.log(models.project.prototype);
    // var all = await models.project.find({});
    // console.log(all);
    // var first = all[0];

    // await first.save();

    console.log(await models.title.find({}));

    console.log('done');
    process.exit();
}