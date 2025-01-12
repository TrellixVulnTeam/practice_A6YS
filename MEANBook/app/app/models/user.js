var mongoose	= require('mongoose'),
	crypto		= require('crypto'),
	Schema		= mongoose.schema;

var UserSchema = new Schema ({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
	},
	username: {
		type: String,
		unique: true,
		require: 'Username is required',
		trim: true
	},
	password: {
		type: String,
		validate: [
		function(password) {
			return password && password.length > 5;
		}, 'Password should be at least 6 characters'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

userSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new
			Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.validPassword = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);