module.exports = class kusama_staking1657757221815 {
  name = 'kusama_staking1657757221815'

  async up(db) {
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "extrinsic_hash" text NOT NULL, "to" jsonb, "from" jsonb NOT NULL, "asset" jsonb NOT NULL, "success" boolean NOT NULL, "type" character varying(12) NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_d0b7149e0dea3bfc1ffa8742a2" ON "transfer" ("success") `)
    await db.query(`CREATE TABLE "account_transfer" ("id" character varying NOT NULL, "direction" character varying(4), "transfer_id" character varying, "account_id" character varying NOT NULL, CONSTRAINT "PK_3b959a286b97fc83be6cec239a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2c2313461bd6c19983900ef539" ON "account_transfer" ("transfer_id") `)
    await db.query(`CREATE INDEX "IDX_d5240d17696e229585da974641" ON "account_transfer" ("account_id") `)
    await db.query(`CREATE TABLE "era" ("id" character varying NOT NULL, "index" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "started_at" integer NOT NULL, "ended_at" integer, "total" numeric NOT NULL, "validators_count" integer NOT NULL, "nominators_count" integer NOT NULL, CONSTRAINT "PK_a30749cdf0189d890a8dbc9aa7d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "era_nomination" ("id" character varying NOT NULL, "vote" numeric NOT NULL, "era_id" character varying NOT NULL, "nominator_id" character varying, "validator_id" character varying, CONSTRAINT "PK_4209193432151f1cbd32a32dc73" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_8d0f2c79f04ed0571d6d8f3f1c" ON "era_nomination" ("era_id") `)
    await db.query(`CREATE INDEX "IDX_fc284e4e8adda73aa3e26b1bc8" ON "era_nomination" ("nominator_id") `)
    await db.query(`CREATE INDEX "IDX_8001c7914ea1cc7ebaf239b443" ON "era_nomination" ("validator_id") `)
    await db.query(`CREATE TABLE "era_staker" ("id" character varying NOT NULL, "staker_id" character varying NOT NULL, "role" character varying(9) NOT NULL, "self_bonded" numeric NOT NULL, "total_bonded" numeric NOT NULL, "total_reward" numeric NOT NULL, "total_slash" numeric NOT NULL, "commission" integer, "era_id" character varying NOT NULL, CONSTRAINT "PK_3476860588278cfe927102186b6" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_db3082693cd9861527d1ab0185" ON "era_staker" ("staker_id") `)
    await db.query(`CREATE INDEX "IDX_73f758807f518c1dbd30b6a76d" ON "era_staker" ("era_id") `)
    await db.query(`CREATE TABLE "slash" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "account_id" character varying NOT NULL, "amount" numeric, "era" integer, "staker_id" character varying, CONSTRAINT "PK_21170fe23f4bb830eaaff8bd4e9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_a5f351552e2281736fe929ff4f" ON "slash" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_870249631facab51316526e589" ON "slash" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_11c194818d549fdd45eb5f4cbf" ON "slash" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_6c2fff31390875a548de9d820d" ON "slash" ("staker_id") `)
    await db.query(`CREATE TABLE "bond" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "account_id" character varying NOT NULL, "amount" numeric, "success" boolean, "type" character varying(6), "staker_id" character varying, CONSTRAINT "PK_2a4d050cae7f0326222053ae2b4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b3ec1c99bd71224c6ef11cf5b0" ON "bond" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_838b5fd70c926e7d7c5bcb56ee" ON "bond" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_380e0ca8c041bf10c97b66b184" ON "bond" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_0bd97db4e1e32b00a831351680" ON "bond" ("success") `)
    await db.query(`CREATE INDEX "IDX_6840433bfd0de70586c3d8f333" ON "bond" ("staker_id") `)
    await db.query(`CREATE TABLE "staker" ("id" character varying NOT NULL, "stash_id" character varying NOT NULL, "controller_id" character varying NOT NULL, "payee_id" character varying NOT NULL, "payee_type" character varying(10) NOT NULL, "role" character varying(9) NOT NULL, "commission" integer, "active_bond" numeric NOT NULL, "total_reward" numeric NOT NULL, "total_slash" numeric NOT NULL, CONSTRAINT "REL_828b14269265a736e4fef52ce2" UNIQUE ("stash_id"), CONSTRAINT "PK_13561f691b22038cfa606fe1161" PRIMARY KEY ("id"))`)
    await db.query(`CREATE UNIQUE INDEX "IDX_828b14269265a736e4fef52ce2" ON "staker" ("stash_id") `)
    await db.query(`CREATE INDEX "IDX_15b7e74748f940d0ccfbf21f1c" ON "staker" ("controller_id") `)
    await db.query(`CREATE INDEX "IDX_1df4573c718e95292cd00f49c3" ON "staker" ("payee_id") `)
    await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "account_id" character varying NOT NULL, "amount" numeric, "era" integer, "validator" text, "call_id" text, "staker_id" character varying, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4b93a54e522c1bc423507342ec" ON "reward" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_51b4a3885904fbbc1296944ca4" ON "reward" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_d244ddc409b7278fcd1e8e54da" ON "reward" ("staker_id") `)
    await db.query(`CREATE INDEX "IDX_b1c227ef81daeda29c93409abe" ON "reward" ("call_id") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "last_update_block" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_2c2313461bd6c19983900ef539c" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80" FOREIGN KEY ("nominator_id") REFERENCES "era_staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_nomination" ADD CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433" FOREIGN KEY ("validator_id") REFERENCES "era_staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_db3082693cd9861527d1ab01856" FOREIGN KEY ("staker_id") REFERENCES "staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "era_staker" ADD CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9" FOREIGN KEY ("era_id") REFERENCES "era"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "slash" ADD CONSTRAINT "FK_11c194818d549fdd45eb5f4cbf4" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "slash" ADD CONSTRAINT "FK_6c2fff31390875a548de9d820d8" FOREIGN KEY ("staker_id") REFERENCES "staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_6840433bfd0de70586c3d8f333d" FOREIGN KEY ("staker_id") REFERENCES "staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "staker" ADD CONSTRAINT "FK_828b14269265a736e4fef52ce26" FOREIGN KEY ("stash_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "staker" ADD CONSTRAINT "FK_15b7e74748f940d0ccfbf21f1c0" FOREIGN KEY ("controller_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "staker" ADD CONSTRAINT "FK_1df4573c718e95292cd00f49c35" FOREIGN KEY ("payee_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_d244ddc409b7278fcd1e8e54da5" FOREIGN KEY ("staker_id") REFERENCES "staker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_d0b7149e0dea3bfc1ffa8742a2"`)
    await db.query(`DROP TABLE "account_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_2c2313461bd6c19983900ef539"`)
    await db.query(`DROP INDEX "public"."IDX_d5240d17696e229585da974641"`)
    await db.query(`DROP TABLE "era"`)
    await db.query(`DROP TABLE "era_nomination"`)
    await db.query(`DROP INDEX "public"."IDX_8d0f2c79f04ed0571d6d8f3f1c"`)
    await db.query(`DROP INDEX "public"."IDX_fc284e4e8adda73aa3e26b1bc8"`)
    await db.query(`DROP INDEX "public"."IDX_8001c7914ea1cc7ebaf239b443"`)
    await db.query(`DROP TABLE "era_staker"`)
    await db.query(`DROP INDEX "public"."IDX_db3082693cd9861527d1ab0185"`)
    await db.query(`DROP INDEX "public"."IDX_73f758807f518c1dbd30b6a76d"`)
    await db.query(`DROP TABLE "slash"`)
    await db.query(`DROP INDEX "public"."IDX_a5f351552e2281736fe929ff4f"`)
    await db.query(`DROP INDEX "public"."IDX_870249631facab51316526e589"`)
    await db.query(`DROP INDEX "public"."IDX_11c194818d549fdd45eb5f4cbf"`)
    await db.query(`DROP INDEX "public"."IDX_6c2fff31390875a548de9d820d"`)
    await db.query(`DROP TABLE "bond"`)
    await db.query(`DROP INDEX "public"."IDX_b3ec1c99bd71224c6ef11cf5b0"`)
    await db.query(`DROP INDEX "public"."IDX_838b5fd70c926e7d7c5bcb56ee"`)
    await db.query(`DROP INDEX "public"."IDX_380e0ca8c041bf10c97b66b184"`)
    await db.query(`DROP INDEX "public"."IDX_0bd97db4e1e32b00a831351680"`)
    await db.query(`DROP INDEX "public"."IDX_6840433bfd0de70586c3d8f333"`)
    await db.query(`DROP TABLE "staker"`)
    await db.query(`DROP INDEX "public"."IDX_828b14269265a736e4fef52ce2"`)
    await db.query(`DROP INDEX "public"."IDX_15b7e74748f940d0ccfbf21f1c"`)
    await db.query(`DROP INDEX "public"."IDX_1df4573c718e95292cd00f49c3"`)
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_4b93a54e522c1bc423507342ec"`)
    await db.query(`DROP INDEX "public"."IDX_51b4a3885904fbbc1296944ca4"`)
    await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
    await db.query(`DROP INDEX "public"."IDX_d244ddc409b7278fcd1e8e54da"`)
    await db.query(`DROP INDEX "public"."IDX_b1c227ef81daeda29c93409abe"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_2c2313461bd6c19983900ef539c"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8d0f2c79f04ed0571d6d8f3f1c5"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_fc284e4e8adda73aa3e26b1bc80"`)
    await db.query(`ALTER TABLE "era_nomination" DROP CONSTRAINT "FK_8001c7914ea1cc7ebaf239b4433"`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_db3082693cd9861527d1ab01856"`)
    await db.query(`ALTER TABLE "era_staker" DROP CONSTRAINT "FK_73f758807f518c1dbd30b6a76d9"`)
    await db.query(`ALTER TABLE "slash" DROP CONSTRAINT "FK_11c194818d549fdd45eb5f4cbf4"`)
    await db.query(`ALTER TABLE "slash" DROP CONSTRAINT "FK_6c2fff31390875a548de9d820d8"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_6840433bfd0de70586c3d8f333d"`)
    await db.query(`ALTER TABLE "staker" DROP CONSTRAINT "FK_828b14269265a736e4fef52ce26"`)
    await db.query(`ALTER TABLE "staker" DROP CONSTRAINT "FK_15b7e74748f940d0ccfbf21f1c0"`)
    await db.query(`ALTER TABLE "staker" DROP CONSTRAINT "FK_1df4573c718e95292cd00f49c35"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_d244ddc409b7278fcd1e8e54da5"`)
  }
}
