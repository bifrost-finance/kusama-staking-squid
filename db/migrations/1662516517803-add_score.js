module.exports = class add_score1662516517803 {
  name = 'add_score1662516517803'

  async up(db) {
    await db.query(`ALTER TABLE "era_staker" ADD "reward_score28" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "nominator_score28" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "stable_score28" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "total_score28" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "reward_score12" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "nominator_score12" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "stable_score12" numeric`)
    await db.query(`ALTER TABLE "era_staker" ADD "total_score12" numeric`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "reward_score28"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "nominator_score28"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "stable_score28"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "total_score28"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "reward_score12"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "nominator_score12"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "stable_score12"`)
    await db.query(`ALTER TABLE "era_staker" DROP COLUMN "total_score12"`)
  }
}
