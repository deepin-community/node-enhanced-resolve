const path = require("path");
const resolve = require("../");

describe("simple", () => {
	const pathsToIt = [
		[__dirname, "../lib/index", "direct"],
		[__dirname, "..", "as directory"],
		[path.join(__dirname, "..", ".."), "./enhanced-resolve", "as module"],
		[
			path.join(__dirname, "..", ".."),
			"./enhanced-resolve/lib/index",
			"in module"
		]
	];
	pathsToIt.forEach(function (pathToIt) {
		it("should resolve itself " + pathToIt[2], function (done) {
			resolve(pathToIt[0], pathToIt[1], function (err, filename) {
				if (err)
					return done(
						new Error([err.message, err.stack, err.details].join("\n"))
					);

				expect(filename).toBeDefined();
				expect(typeof filename).toEqual("string");
				expect(filename).toEqual(path.join(__dirname, "..", "lib", "index.js"));
				done();
			});
		});
		it("should resolve itself sync " + pathToIt[2], () => {
			const filename = resolve.sync(pathToIt[0], pathToIt[1]);

			expect(filename).toBeDefined();
			expect(typeof filename).toEqual("string");
			expect(filename).toEqual(path.join(__dirname, "..", "lib", "index.js"));
		});
	});
});
