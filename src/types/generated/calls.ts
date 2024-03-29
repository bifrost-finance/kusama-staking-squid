import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result} from './support'
import * as v1020 from './v1020'
import * as v1050 from './v1050'
import * as v2028 from './v2028'
import * as v9111 from './v9111'

export class StakingBondCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.bond')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.bond') === '3cace3eeefbd92edd61c1cab1250874814a606c95414451a83315e0301be4cff'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get asV1020(): {controller: v1020.LookupSource, value: bigint, payee: v1020.RewardDestination} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this._chain.getCallHash('Staking.bond') === '20db399e4963916b83c2636d8d5e414b30d79d868ca62d05181259e5d0c02e7e'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
   *  the `origin` falls below _existential deposit_ and gets removed as dust.
   *  # </weight>
   */
  get asV1050(): {controller: Uint8Array, value: bigint, payee: v1050.RewardDestination} {
    assert(this.isV1050)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get isV2028(): boolean {
    return this._chain.getCallHash('Staking.bond') === '6c5de9285e9c4ba450dfa1ed6ebededa6083cc2b06cee317e92c1f89751818c6'
  }

  /**
   *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *  be the account that controls it.
   * 
   *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   *  Emits `Bonded`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Moderate complexity.
   *  - O(1).
   *  - Three extra DB entries.
   * 
   *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
   *  ------------------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
   *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
   *  # </weight>
   */
  get asV2028(): {controller: v2028.LookupSource, value: bigint, payee: v2028.RewardDestination} {
    assert(this.isV2028)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Take the origin account as a stash and lock up `value` of its balance. `controller` will
   * be the account that controls it.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   * Emits `Bonded`.
   * # <weight>
   * - Independent of the arguments. Moderate complexity.
   * - O(1).
   * - Three extra DB entries.
   * 
   * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   * unless the `origin` falls below _existential deposit_ and gets removed as dust.
   * ------------------
   * # </weight>
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Staking.bond') === 'c0b607a5cbdc40ee9aed26b3c86cfe3159aeccd5ac4e9005210dd39d0317ba48'
  }

  /**
   * Take the origin account as a stash and lock up `value` of its balance. `controller` will
   * be the account that controls it.
   * 
   * `value` must be more than the `minimum_balance` specified by `T::Currency`.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash account.
   * 
   * Emits `Bonded`.
   * # <weight>
   * - Independent of the arguments. Moderate complexity.
   * - O(1).
   * - Three extra DB entries.
   * 
   * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   * unless the `origin` falls below _existential deposit_ and gets removed as dust.
   * ------------------
   * # </weight>
   */
  get asV9111(): {controller: v9111.MultiAddress, value: bigint, payee: v9111.RewardDestination} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingBondExtraCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.bond_extra')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Add some extra amount that have appeared in the stash `free_balance` into the balance up
   *  for staking.
   * 
   *  Use this if there are additional funds in your stash account that you wish to bond.
   *  Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
   *  that can be added.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.bond_extra') === 'f92c56c980d6a55c468653fc3149548edcf2481e5da53835a201cafa7dc02fd8'
  }

  /**
   *  Add some extra amount that have appeared in the stash `free_balance` into the balance up
   *  for staking.
   * 
   *  Use this if there are additional funds in your stash account that you wish to bond.
   *  Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
   *  that can be added.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get asV1020(): {maxAdditional: bigint} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingChillCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.chill')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Declare no desire to either validate or nominate.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains one read.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.chill') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Declare no desire to either validate or nominate.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains one read.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1020(): null {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingKickCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.kick')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Remove the given nominations from the calling validator.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`. The controller
   *  account should represent a validator.
   * 
   *  - `who`: A list of nominator stash accounts who are nominating this validator which
   *    should no longer be nominating this validator.
   * 
   *  Note: Making this call only makes sense if you first set the validator preferences to
   *  block any further nominations.
   */
  get isV2028(): boolean {
    return this._chain.getCallHash('Staking.kick') === '760f2d470d3cb5efbef130b8d79a202238d983a6680d5e2d4eee31ad48834e9f'
  }

  /**
   *  Remove the given nominations from the calling validator.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`. The controller
   *  account should represent a validator.
   * 
   *  - `who`: A list of nominator stash accounts who are nominating this validator which
   *    should no longer be nominating this validator.
   * 
   *  Note: Making this call only makes sense if you first set the validator preferences to
   *  block any further nominations.
   */
  get asV2028(): {who: v2028.LookupSource[]} {
    assert(this.isV2028)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Remove the given nominations from the calling validator.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * - `who`: A list of nominator stash accounts who are nominating this validator which
   *   should no longer be nominating this validator.
   * 
   * Note: Making this call only makes sense if you first set the validator preferences to
   * block any further nominations.
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Staking.kick') === 'e538d9391f8376022db5c010fa7390c92954267b2d5ebc13e621f87adebe57b9'
  }

  /**
   * Remove the given nominations from the calling validator.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * - `who`: A list of nominator stash accounts who are nominating this validator which
   *   should no longer be nominating this validator.
   * 
   * Note: Making this call only makes sense if you first set the validator preferences to
   * block any further nominations.
   */
  get asV9111(): {who: v9111.MultiAddress[]} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingNominateCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.nominate')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.nominate') === 'ef0d9859df5914c3ac406eb6255e894f22bdc249ab0f7f82c6f01029112924b1'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1020(): {targets: v1020.LookupSource[]} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this._chain.getCallHash('Staking.nominate') === '730fc5a4090c1c566ea6d11126ba7258c98a461b0c6bfca8bf9e17e42f8801de'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1050(): {targets: Uint8Array[]} {
    assert(this.isV1050)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get isV2028(): boolean {
    return this._chain.getCallHash('Staking.nominate') === 'a653cde167810e73479047a5ef0738fdd0dc4e9afa5b310a19c8335e4378f706'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get asV2028(): {targets: v2028.LookupSource[]} {
    assert(this.isV2028)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Staking.nominate') === '4b7eca27044655bd9da5cc614a4bf774babc00decbed9ca59d95298b300d72de'
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get asV9111(): {targets: v9111.MultiAddress[]} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingPayoutStakersCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.payout_stakers')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Pay out all the stakers behind a single validator for a single era.
   * 
   *  - `validator_stash` is the stash account of the validator. Their nominators, up to
   *    `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
   *  - `era` may be any era between `[current_era - history_depth; current_era]`.
   * 
   *  The origin of this call must be _Signed_. Any account can call this function, even if
   *  it is not one of the stakers.
   * 
   *  This can only be called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Time complexity: at most O(MaxNominatorRewardedPerValidator).
   *  - Contains a limited number of reads and writes.
   *  # </weight>
   */
  get isV1058(): boolean {
    return this._chain.getCallHash('Staking.payout_stakers') === '1a09dc413ed4b8ce5cbcdc282b798636ca24268cca001e43fc92d892de3b6a5f'
  }

  /**
   *  Pay out all the stakers behind a single validator for a single era.
   * 
   *  - `validator_stash` is the stash account of the validator. Their nominators, up to
   *    `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
   *  - `era` may be any era between `[current_era - history_depth; current_era]`.
   * 
   *  The origin of this call must be _Signed_. Any account can call this function, even if
   *  it is not one of the stakers.
   * 
   *  This can only be called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Time complexity: at most O(MaxNominatorRewardedPerValidator).
   *  - Contains a limited number of reads and writes.
   *  # </weight>
   */
  get asV1058(): {validatorStash: Uint8Array, era: number} {
    assert(this.isV1058)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingSetControllerCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.set_controller')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.set_controller') === 'ea495be34eb0363f94ad384fd20004dfec26ca760dc2776b92541482a1719f1b'
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1020(): {controller: v1020.LookupSource} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this._chain.getCallHash('Staking.set_controller') === 'bbdd03dc244a9d87deceeb91d015d7ef52746b99580b1474586c8699a77574e1'
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1050(): {controller: Uint8Array} {
    assert(this.isV1050)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get isV2028(): boolean {
    return this._chain.getCallHash('Staking.set_controller') === '61b4041aa7366e679d366d2062deb643451b64015c330746395765e6865e5af2'
  }

  /**
   *  (Re-)set the controller of a stash.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  ----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
   *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
   *  # </weight>
   */
  get asV2028(): {controller: v2028.LookupSource} {
    assert(this.isV2028)
    return this._chain.decodeCall(this.call)
  }

  /**
   * (Re-)set the controller of a stash.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ----------
   * Weight: O(1)
   * DB Weight:
   * - Read: Bonded, Ledger New Controller, Ledger Old Controller
   * - Write: Bonded, Ledger New Controller, Ledger Old Controller
   * # </weight>
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Staking.set_controller') === '81dc3a18eb19c7f258654686fb92e5bf48185191f2c59179a5b4626965fc66cd'
  }

  /**
   * (Re-)set the controller of a stash.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ----------
   * Weight: O(1)
   * DB Weight:
   * - Read: Bonded, Ledger New Controller, Ledger Old Controller
   * - Write: Bonded, Ledger New Controller, Ledger Old Controller
   * # </weight>
   */
  get asV9111(): {controller: v9111.MultiAddress} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingSetPayeeCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.set_payee')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  (Re-)set the payment target for a controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.set_payee') === 'e3e8a6a5ee204c56e926f714a3d580d47fe315d3b243872e40cc8959db768aa8'
  }

  /**
   *  (Re-)set the payment target for a controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1020(): {payee: v1020.RewardDestination} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   * (Re-)set the payment target for a controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ---------
   * - Weight: O(1)
   * - DB Weight:
   *     - Read: Ledger
   *     - Write: Payee
   * # </weight>
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Staking.set_payee') === 'e882138b8d0371da862d058ac00f1def3ca0f71ab72eda3fbfb7d75b5fa16515'
  }

  /**
   * (Re-)set the payment target for a controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - Independent of the arguments. Insignificant complexity.
   * - Contains a limited number of reads.
   * - Writes are limited to the `origin` account key.
   * ---------
   * - Weight: O(1)
   * - DB Weight:
   *     - Read: Ledger
   *     - Write: Payee
   * # </weight>
   */
  get asV9111(): {payee: v9111.RewardDestination} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingUnbondCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.unbond')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Schedule a portion of the stash to be unlocked ready for transfer out after the bond
   *  period ends. If this leaves an amount actively bonded less than
   *  T::Currency::minimum_balance(), then it is increased to the full amount.
   * 
   *  Once the unlock period is done, you can call `withdraw_unbonded` to actually move
   *  the funds out of management ready for transfer.
   * 
   *  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
   *  can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
   *  to be called first to remove some of the chunks (if possible).
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
   *  - One DB entry.
   *  </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.unbond') === 'd13cb91c3f61510beece366e7f7c2d0705f01d70f9bc28721d2437cd210a3372'
  }

  /**
   *  Schedule a portion of the stash to be unlocked ready for transfer out after the bond
   *  period ends. If this leaves an amount actively bonded less than
   *  T::Currency::minimum_balance(), then it is increased to the full amount.
   * 
   *  Once the unlock period is done, you can call `withdraw_unbonded` to actually move
   *  the funds out of management ready for transfer.
   * 
   *  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
   *  can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
   *  to be called first to remove some of the chunks (if possible).
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  See also [`Call::withdraw_unbonded`].
   * 
   *  # <weight>
   *  - Independent of the arguments. Limited but potentially exploitable complexity.
   *  - Contains a limited number of reads.
   *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
   *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
   *    The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
   *  - One DB entry.
   *  </weight>
   */
  get asV1020(): {value: bigint} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}

export class StakingValidateCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Staking.validate')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Staking.validate') === 'a03cfe73ae98f87de904386556fc6e78943abbd5d595884756c4155f8694e080'
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  # </weight>
   */
  get asV1020(): {prefs: v1020.ValidatorPrefs} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  -----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Era Election Status, Ledger
   *  - Write: Nominators, Validators
   *  # </weight>
   */
  get isV2028(): boolean {
    return this._chain.getCallHash('Staking.validate') === '2a662df491d449985438edd4d2e6899fd06beebbaa59e759713811ade38308bf'
  }

  /**
   *  Declare the desire to validate for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - Independent of the arguments. Insignificant complexity.
   *  - Contains a limited number of reads.
   *  - Writes are limited to the `origin` account key.
   *  -----------
   *  Weight: O(1)
   *  DB Weight:
   *  - Read: Era Election Status, Ledger
   *  - Write: Nominators, Validators
   *  # </weight>
   */
  get asV2028(): {prefs: v2028.ValidatorPrefs} {
    assert(this.isV2028)
    return this._chain.decodeCall(this.call)
  }
}

export class SystemRemarkCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'System.remark')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Make some on-chain remark.
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
  }

  /**
   *  Make some on-chain remark.
   */
  get asV1020(): {remark: Uint8Array} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}
