function require_assoc(assoc, prefix) {
    for (var key in assoc) {
        assoc[key] = require(prefix + '.' + key);
    }
}

var spawners = {
    'default': null
};
var roles = {
    'harvester': null,
    'upgrader': null,
    'builder': null,
    'transporter': null
};
require_assoc(spawners, 'spawner');
require_assoc(roles, 'role');

module.exports.loop = function () {

    for (var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    for (var spawner in spawners) {
        var spawn = Game.spawns[spawner];
        if (spawn) {
            spawners[spawner].run(spawn);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (var role in roles) {
            if (creep.memory.role == role) {
                roles[role].run(creep);
            }
        }
    }
}