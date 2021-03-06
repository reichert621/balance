import * as React from 'react';

interface IBalanceUser {
  name: string;
  stake?: number;
  goods?: string;
  successes?: number;
  failures?: number;
}

interface Props {
  buyer: IBalanceUser;
  seller: IBalanceUser;
  onUpdate: (updates: any) => void;
}

interface State {
  buyerStake: number;
  sellerStake: number;
}

class BalanceStakeDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { buyer = {} as IBalanceUser, seller = {} as IBalanceUser } = props;
    const { stake: buyerStake } = buyer;
    const { stake: sellerStake } = seller;

    this.state = { buyerStake, sellerStake };
  }

  render() {
    const { buyerStake, sellerStake } = this.state;
    const { onUpdate } = this.props;

    return (
      <div>
        <h4 className="new-balance-detail-header">Stake Amount</h4>

        {/* TODO */}
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <div className="balance-alert">
            <div className="alert-text text-bold">Your First Stake</div>
            <div className="alert-description text-sm">
              Balance builds mutual trust amongst new business partners and
              strangers by asking both parties to stake a small amount to
              demonstrate good intent, when a both parties are happy with the
              work the stake is returned.
            </div>
            <div className="alert-action text-sm text-bold">Dismiss</div>
          </div>

          <div className="form-group">
            <label className="label-default">Your Stake</label>
            <input
              className="input-default full-width"
              type="number"
              placeholder="$50"
              value={buyerStake}
              onChange={e =>
                this.setState({ buyerStake: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group">
            <label className="label-default">
              User's Proposed Stake (Optional)
            </label>
            <input
              className="input-default full-width"
              placeholder="$25"
              value={sellerStake}
              onChange={e =>
                this.setState({ sellerStake: Number(e.target.value) })
              }
            />
          </div>

          <button
            className="btn-primary full-width"
            onClick={() =>
              onUpdate({
                buyer: { stake: buyerStake },
                seller: { stake: sellerStake }
              })
            }
          >
            <img src="assets/btn-logo-1.svg" style={{ marginRight: 16 }} />
            Save Contract
          </button>
        </div>
      </div>
    );
  }
}

export default BalanceStakeDetails;
