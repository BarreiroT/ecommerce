import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { OrderState } from '../../../../models/Order';
import { TestRunner } from '../../../../TestRunner';
import { MobbexEvent } from '../../../../types/Mobbex';
import { MobbexPayment } from '../PaymentSystem';

import checkoutEvent from './mobbexEvent.json';

const deepClonedEvent = () => {
    return JSON.parse(JSON.stringify(checkoutEvent));
};

chai.use(chaiAsPromised);

const { expect } = chai;

const testRunner = new TestRunner();

const createOrder = () => {
    const checkoutSystem = testRunner.checkoutSystem();

    return checkoutSystem.createOrder({
        description: 'Test Order',
        amount: 500,
        currency: 'ARS',
        state: OrderState.New,
    });
};

describe('Checkout System', () => {
    beforeEach(async () => {
        await testRunner.generateStorages();
    });

    afterEach(async () => {
        await testRunner.cleanStoredData();
    });

    describe('Orders', () => {
        it('Creates an order', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            await expect(
                checkoutSystem.createOrder({
                    description: 'Test Order',
                    amount: 500,
                    currency: 'ARS',
                    state: OrderState.New,
                }),
            ).to.eventually.be.ok;
        });

        it('Finds an order', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            const createdOrder = await createOrder();

            const foundOrder = await checkoutSystem.findOrderById(createdOrder.id);

            expect(foundOrder.id).to.equal(createdOrder.id);
        });

        it('Fails when searching for a nonexistent order', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            const nonExistentId = '9cdfa0b0-92b5-4264-937c-597b0baf243f';

            await expect(checkoutSystem.findOrderById(nonExistentId)).to.eventually.be.rejectedWith(
                'This order does not exist.',
            );
        });
    });

    describe('Payment System', async () => {
        it('Generates Payment Process', async function () {
            this.timeout(5000);

            const checkoutSystem = testRunner.checkoutSystem();

            await expect(
                checkoutSystem.startsCheckoutProcess({
                    amount: 50,
                    description: 'Gracias por comprar en',
                    currency: 'ARS',
                    customer: {
                        email: 'testing@mobbex.com',
                        name: 'Testing',
                        identification: '11111111',
                    },
                }),
            ).to.eventually.be.ok;
        });

        it('Sets the order state to payed if the event is accepted', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            const event: MobbexEvent = deepClonedEvent();

            const order = await createOrder();

            event.data.payment.reference = order.id;
            event.data.payment.status.code = '200';

            const paymentEvent = new MobbexPayment(event);

            const result = await checkoutSystem.processCheckoutEvent(paymentEvent);

            const updatedOrder = await checkoutSystem.findOrderById(order.id);

            expect(result).to.equal(true);
            expect(updatedOrder.state).to.equal(OrderState.Payed);
        });

        it('Sets the order as pending if the event is pending', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            const event: MobbexEvent = deepClonedEvent();

            const order = await createOrder();

            event.data.payment.reference = order.id;
            event.data.payment.status.code = '3';

            const paymentEvent = new MobbexPayment(event);

            const result = await checkoutSystem.processCheckoutEvent(paymentEvent);

            const updatedOrder = await checkoutSystem.findOrderById(order.id);

            expect(result).to.equal(true);
            expect(updatedOrder.state).to.equal(OrderState.Pending);
        });

        it('Sets the order as canceled if the event is canceled', async () => {
            const checkoutSystem = testRunner.checkoutSystem();

            const event: MobbexEvent = deepClonedEvent();

            const order = await createOrder();

            event.data.payment.reference = order.id;
            event.data.payment.status.code = '400';

            const paymentEvent = new MobbexPayment(event);

            const result = await checkoutSystem.processCheckoutEvent(paymentEvent);

            const updatedOrder = await checkoutSystem.findOrderById(order.id);

            expect(result).to.equal(true);
            expect(updatedOrder.state).to.equal(OrderState.Canceled);
        });
    });
});
