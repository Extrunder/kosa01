module.exports = {
    /** @param {StructureSpawn} spawn **/
    run: function(spawn) {
        var body = null;
        var role = null;
    
        var harvesters =   _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        var builders =     _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders =    _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        
        Memory.info = {
            transporters: transporters.length,
            harvesters: harvesters.length,
            upgraders: upgraders.length,
            builders: builders.length,
        };
        
        if (harvesters.length + transporters.length < 4) {
            if (harvesters.length <= transporters.length * 3) {
                body = [WORK,WORK,CARRY,MOVE];
                role = 'harvester';
            } else {
                body = [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
                role = 'transporter';
            }
        } else {
            if (builders.length < 1) {
                body = [WORK,WORK,CARRY,MOVE];
                role = 'builder';
            }
            else if (upgraders.length < 2) {
                body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
                role = 'upgrader';
            }
        }
        if (body/*spawn.canCreateCreep(body)*/) {
            var result = spawn.createCreep(body, undefined, {role:role});
            if(_.isString(result)) {
                console.log('Spawning new (' + role + ': ' + body.join(',') + '): ' + result);
            }
            else {
                console.log('Spawn error: '+ result + ' (' + role + ': ' + body.join(',') + ')');
            }
        }
    }
};