import API from "api";
import uuid from "uuid/v1";

const profile_id = "11319295";

const scheduledPayout = async (schedule_details: any) => {
  const target_account = schedule_details.contract!.people[0].recipient.id;
  const target_currency = schedule_details.contract!.people[0].recipient
    .currency;
  const target_amount = schedule_details.contract!.people[0].recipient.amount;
  const source_currency = schedule_details.source.currency;
  const contract_name = schedule_details.contract.name;

  const quotes_body = {
    profile: profile_id,
    source: source_currency,
    target: target_currency,
    rateType: "FIXED",
    targetAmount: target_amount,
    type: "BALANCE_PAYOUT"
  };

  const quote = await API("POST", "v1/quotes", quotes_body);

  const transfers_body = {
    targetAccount: target_account,
    quote: quote.data.id,
    customerTransactionId: uuid(),
    details: {
      reference: contract_name
    }
  };

  const transfer = await API("POST", "v1/transfers", transfers_body);

  const fund_body = {
    type: "BALANCE"
  };
  const fund = await API(
    "POST",
    `v3/profiles/${profile_id}/transfers/${transfer.data.id}/payments`,
    fund_body
  );
  return {
    status: "success",
    data: fund.data
  };
};

export default scheduledPayout;
