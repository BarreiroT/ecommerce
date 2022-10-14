import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { TestRunner } from '../../../../TestRunner';

chai.use(chaiAsPromised);

const { expect } = chai;

const testRunner = new TestRunner();

const createProduct = () => {
    const productSystem = testRunner.productSystem();

    return productSystem.create('Test Product', 500);
};

describe('Product System', () => {
    beforeEach(async () => {
        await testRunner.generateStorages();
    });

    afterEach(async () => {
        await testRunner.cleanStoredData();
    });

    it('Creates a product', async () => {
        const productSystem = testRunner.productSystem();

        await expect(productSystem.create('Test Product', 500)).to.eventually.be.ok;
    });

    it('Finds a product', async () => {
        const productSystem = testRunner.productSystem();

        const createdProduct = await createProduct();

        const foundOrder = await productSystem.findProductById(createdProduct.id);

        expect(foundOrder.id).to.equal(createdProduct.id);
    });

    it('Fails when searching for a nonexistent product', async () => {
        const productSystem = testRunner.productSystem();

        const nonExistentId = '9cdfa0b0-92b5-4264-937c-597b0baf243f';

        await expect(productSystem.findProductById(nonExistentId)).to.eventually.be.rejectedWith(
            'This product does not exist.',
        );
    });
});
