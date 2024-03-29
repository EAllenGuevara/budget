import React, { useState } from 'react';

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

import { SYSTEM_ENVELOPES, BUDGET_MODAL_CONSTANTS } from '../../constants';
//temporary in place of api
import { FUNDING_PROFILES } from '../../../Budget/components/Funding_Profile/constants';

export default function FundingModal(props) {    
    const [state, setState] = useState({ 
        envelopes: props.envelopes.map((envelope) => {
            return {
                ...envelope,
                inputAmount: 0,
                updatedAmount: envelope.amount,
            }
        }),
        allocation: 0,
    });

    //list of available funding profiles
    const fundingProfiles = FUNDING_PROFILES.map((profile, index) => {
        // 0 index will show up as null in applyFundingProfile if not forced into a string format
        return <Dropdown.Item as="button" key={index} eventKey={index.toString()} onSelect={applyFundingProfile}>
            {profile.income.name} - {new Intl.DateTimeFormat('en-US').format(new Date(profile.date))}
        </Dropdown.Item>
    });

    //filter out system envelopes and create mutable copy of array
    let fundingEnvelopes = state.envelopes.map((envelope, i) => {
        let env = null;
        if(!envelope.systemEnvelope) {
            env = <tr key={envelope._id}>
                <td>{envelope.name}</td>
                <td className={envelope.amount < 0 ? 'text-danger':''}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(envelope.amount)}</td>
                <td><Form.Control size="sm" type="number" name={i} value={envelope.inputAmount} onChange={handleInputChange} /></td>
                <td className={envelope.updatedAmount < 0 ? 'text-danger':''}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(envelope.updatedAmount)}</td>
            </tr>;
        }
        
        return env;
    });

    /**
     * Updates all envelopes and totals with values from selected funding profile.
     * Also clears all funding when null is passed as an argument.
     * @param {String} eventKey - index of the selected funding profile. SHOULD
     *  WE PARSE eventKey TO INT??
     */
    function applyFundingProfile(eventKey) {
        setState(prevState => {
            const prevStateCopy = {...prevState};
            const selectedProfile = FUNDING_PROFILES[eventKey] || eventKey;
            prevStateCopy.envelopes.forEach((env) => {
                //find matching envelope if none found reset values
                const matchingEnvelope = selectedProfile 
                    ? selectedProfile.envelopes.find((profileEnvelope) => env._id === profileEnvelope._id )
                    : null;
                env.inputAmount = matchingEnvelope ? matchingEnvelope.amount : 0;
                env.updatedAmount = matchingEnvelope ? matchingEnvelope.amount + env.amount : env.amount;
            });
            //tally up funds to display total allocation
            prevStateCopy.allocation = prevStateCopy.envelopes.reduce((runningTotal, envelope) => runningTotal + envelope.inputAmount, 0);
            return prevStateCopy;
        });        
    }

    /**
     * Updates and stores funding amounts from individual envelopes
     * @param {Object} e - input event object from envelope funding fields
     */
    function handleInputChange(e) {
        const targetIndex = parseInt(e.target.name);
        const updatedEnvelope = {
            ...state.envelopes[targetIndex],
            inputAmount: parseFloat(e.target.value),
            updatedAmount: parseFloat(e.target.value) + parseFloat(state.envelopes[targetIndex].amount)
        };
        setState(prevState => {
            const prevStateCopy = {...prevState};
            prevStateCopy.envelopes.splice(targetIndex, 1, updatedEnvelope);
            //tally up funds to display total allocation
            prevStateCopy.allocation = prevStateCopy.envelopes.reduce((runningTotal, envelope) => runningTotal + envelope.inputAmount, 0);
            return prevStateCopy;
        });
    }

    function cancel() {
        props.onHide(BUDGET_MODAL_CONSTANTS.TOGGLE_FUNDING_MODAL);    
    }

    /**
     * Create new version of envelopes from state and start passing it all
     * the way up to the App component.
     */
    function fund() {
        const updatedEnvelopes = state.envelopes.map(envelope => {
            const envCopy = {...envelope}
            //update cash pool
            if(envCopy.name === SYSTEM_ENVELOPES.CASH_POOL) {
                envCopy.amount = envCopy.amount - state.allocation;
            //only update if changed
            } else if(envCopy.updatedAmount !== envCopy.amount) {
                envCopy.amount = envCopy.updatedAmount;
            }

            //remove modal properties
            delete envCopy.updatedAmount;
            delete envCopy.inputAmount;

            return envCopy;
        });

        props.onHide(BUDGET_MODAL_CONSTANTS.TOGGLE_FUNDING_MODAL, updatedEnvelopes);
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Envelope Funding
        </Modal.Header>
        <Modal.Body>
            <h5>Cash Pool: {props.envelopes[0].amount}</h5>
            <DropdownButton id="dropdown-basic-button" size="sm" title="Apply Funding Profile">
                {fundingProfiles}
                <Dropdown.Divider />
                <Dropdown.Item eventKey={null} onSelect={applyFundingProfile}>Clear Allocations</Dropdown.Item>
            </DropdownButton>
            <form>
            <table className="table table-striped table-sm">
                <tbody>
                    <tr>
                        <th>Envelope</th>
                        <th>Current Balance</th>
                        <th>Amount to be Funded</th>
                        <th>New Balance</th>
                    </tr>                    
                    {fundingEnvelopes}                    
                </tbody>
            </table>
            </form>
            <table className="table table-sm">
                <tbody>
                    <tr>
                        <td>Available</td>
                        <td className={props.envelopes[0].amount < 0 ? 'text-danger':''}>{props.envelopes[0].amount}</td>
                    </tr>
                    <tr>
                        <td>Allocation</td>
                        <td>{state.allocation}</td>
                    </tr>
                    <tr>
                        <td>Difference</td>
                        <td className={props.envelopes[0].amount - state.allocation < 0 ? 'text-danger':''}>{props.envelopes[0].amount - state.allocation}</td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" size="sm" onClick={fund} disabled={state.allocation === 0}>Fund</Button>
            <Button variant="light" size="sm" onClick={cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

