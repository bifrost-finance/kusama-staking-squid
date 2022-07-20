module.exports = class validator_rating1658275316677 {
  name = 'validator_rating1658275316677'

  async up(db) {
    await db.query(`ALTER TABLE "era_staker" ADD "effective_nominator_stake" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "reward_score" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "nominator_score" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "stable_score" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "total_score" numeric`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "effective_nominator_stake"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "reward_score"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "nominator_score"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "stable_score"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "total_score"`)
  }
}
