const assert = require('chai').assert
const sinon = require('sinon')
const random = sinon.stub(Math, 'random');

const Hydra = require('../exercises/hydra')
const Hero = require('../exercises/hero')

describe('Hydra', () => {

  it.skip('should be a function', () => {
    assert.isFunction(Hydra)
    const hydra = new Hydra()
    assert.isObject(hydra)
  })

  it.skip('should start alive', () => {
    const hydra = new Hydra()
    assert.equal(hydra.alive, true)
  })

  it.skip('should reside in Lake Lerna', () => {
    const hydra = new Hydra()
    assert.equal(hydra.location, 'Lake Lerna')
  })

  it.skip('should start with 1 immortal head', () => {
    const hydra = new Hydra()
    assert.equal(hydra.heads, 1);
  })

  it.skip('should be able to add up to 4 more heads', () => {
    const hydra = new Hydra()
    assert.equal(hydra.heads, 1);
    const hydra2 = new Hydra(4)
    assert.equal(hydra2.heads, 5);
    const hydra3 = new Hydra(5)
    assert.equal(hydra3.heads, 5);
  })

  it.skip('should start with no missing heads', () => {
    const hydra = new Hydra(3)
    assert.equal(hydra.hasMissing, false);
  })

  it.skip('should be able to spit acid from its heads', () => {
    const hydra = new Hydra(3)
    assert.equal(hydra.spitAcid(), 'The Hydra spit 4 glob(s) of acid!')
  })

  it.skip('should be be able to dodge incoming attacks', () => {
    const hydra = new Hydra(3)
    assert.equal(hydra.dodgeChance, 0.25)
  })

  random.onCall(0).returns(0.25);
  random.onCall(1).returns(0.26);

  it.skip('should try to dodge if attacked', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')

    hercules.travelTo(hydra)

    assert.equal(hercules.attack(hydra), 'Hercules missed');
    assert.equal(hydra.heads, 4);

    hercules.attack(hydra);
    assert.equal(hydra.heads, 3);
    assert.equal(hydra.hasMissing, true);

  })

  random.onCall(2).returns(0.26);

  it.skip('should lose a head when successfully attacked', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')

    hercules.travelTo(hydra)

    hercules.attack(hydra)
    assert.equal(hydra.heads, 3)
    assert.equal(hydra.hasMissing, true)
  })

  random.onCall(3).returns(0.26);
  random.onCall(4).returns(0.25);

  it.skip('should grow two heads after one is cut off if not cauterized', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)

    hercules.attack(hydra)
    assert.equal(hydra.heads, 3)
    assert.equal(hydra.hasMissing, true)

    iolaus.cauterize(hydra);
    assert.equal(hydra.heads, 5)
    assert.equal(hydra.hasMissing, false)
  })

  random.onCall(5).returns(0.26);
  random.onCall(6).returns(0.26);
  random.onCall(7).returns(0.26);
  random.onCall(8).returns(0.26);

  it.skip('should die if it loses all its heads', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)

    hercules.attack(hydra)
    hercules.attack(hydra)
    hercules.attack(hydra)
    assert.equal(hydra.heads, 1)
    assert.equal(hydra.alive, true)

    hercules.attack(hydra)
    assert.equal(hydra.heads, 0)
    assert.equal(hydra.alive, false)
  });

})

describe('Hero', () => {

  it.skip('should be a function', () => {
    assert.isFunction(Hydra)
    const hero = new Hero()
    assert.isObject(hero)
  })

  it.skip('should have a name', () => {
    const hercules = new Hero('Hercules')
    assert.equal(hercules.name, 'Hercules')
  })

  it.skip('should come from Rome', () => {
    const hercules = new Hero('Hercules')
    assert.equal(hercules.name, 'Hercules')
    assert.equal(hercules.location, 'Rome')
  })

  it.skip('wants to collect Hydra blood', () => {
    const hercules = new Hero('Hercules')
    assert.equal(hercules.hasBlood, false)
  })

  it.skip('should be able to travel to the Hydra', () => {
    const hydra = new Hydra()
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)
    iolaus.travelTo(hydra)

    assert.equal(hydra.location, 'Lake Lerna')
    assert.equal(hercules.location, 'Lake Lerna')
    assert.equal(iolaus.location, 'Lake Lerna')
  })

  it.skip('should only be able to attack the Hydra if it is in the same location', () => {
    const hydra = new Hydra()
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    assert.equal(hercules.attack(hydra), "The Hydra is not here.");

    hercules.travelTo(hydra)
    iolaus.travelTo(hydra)

    assert.equal(hydra.location, 'Lake Lerna')
    assert.equal(hercules.location, 'Lake Lerna')
    assert.equal(iolaus.location, 'Lake Lerna')
  })

  it.skip('should only be able to cut off a head of the Hydra if named Hercules', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)
    iolaus.travelTo(hydra)

    assert.equal(iolaus.attack(hydra), "Iolaus is not strong enough to fight the Hydra!")
  })

  random.onCall(9).returns(0.26);
  random.onCall(10).returns(0.26);

  it.skip('should be able to cauterize the wound if there is a head missing, is named Iolaus, and the Hydra does not dodge', () => {

    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)
    iolaus.travelTo(hydra)

    hercules.attack(hydra);
    assert.equal(hydra.heads, 3)

    assert.equal(hercules.cauterize(hydra), 'Hercules is too slow to cuterize the wound');
    iolaus.cauterize(hydra)
    assert.equal(hydra.hasMissing, false);
    assert.equal(hydra.heads, 3);
  })

  random.onCall(11).returns(0.26);
  random.onCall(12).returns(0.26);
  random.onCall(13).returns(0.26);
  random.onCall(14).returns(0.26);

  it.skip('should collect blood once the Hydra is dead', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)

    hercules.attack(hydra)
    hercules.attack(hydra)
    hercules.attack(hydra)
    assert.equal(hydra.heads, 1)
    assert.equal(hydra.alive, true)

    hercules.collectBlood(hydra);
    assert.equal(hercules.collectBlood(hydra), 'Hercules cannot collect blood from the Hydra while it is still alive')

    hercules.attack(hydra)
    assert.equal(hydra.heads, 0)
    assert.equal(hydra.alive, false)

    hercules.collectBlood(hydra);
    assert.equal(hercules.hasBlood, true)
  });

  random.onCall(11).returns(0.26);
  random.onCall(12).returns(0.26);
  random.onCall(13).returns(0.26);
  random.onCall(14).returns(0.26);

  it.skip('can return home once it has collected blood', () => {
    const hydra = new Hydra(3)
    const hercules = new Hero('Hercules')
    const iolaus = new Hero('Iolaus')

    hercules.travelTo(hydra)

    assert.equal(hercules.returnHome(), "Hercules cannot return home until he has the Hydra's blood")
    assert.equal(hercules.location, 'Lake Lerna')

    hercules.attack(hydra)
    hercules.attack(hydra)
    hercules.attack(hydra)
    assert.equal(hydra.heads, 1)
    assert.equal(hydra.alive, true)

    hercules.collectBlood(hydra);
    assert.equal(hercules.collectBlood(hydra), 'Hercules cannot collect blood from the Hydra while it is still alive')

    hercules.attack(hydra)
    assert.equal(hydra.heads, 0)
    assert.equal(hydra.alive, false)

    hercules.collectBlood(hydra);
    assert.equal(hercules.hasBlood, true)

    hercules.returnHome()
    assert.equal(hercules.location, 'Rome')
  });
})
