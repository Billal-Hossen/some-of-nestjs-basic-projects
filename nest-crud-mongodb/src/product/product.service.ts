import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create.product.dto';
import { UpdateProductDto } from './dtos/update.product.dto';

import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}
  // craete a product
  async createProduct(createProductDto: CreateProductDto) {
    const { name, price, description } = createProductDto;
    const newProduct = new this.productModel({ name, price, description });
    return newProduct.save();
  }
  // get all product
  async getAllProduct(): Promise<ProductDocument[]> {
    const found = await this.productModel.find();
    return found;
  }
  //get product By ID
  async getProductById(productId: string): Promise<ProductDocument> {
    const found = await this.productModel.findById(productId);
    if (!found) {
      throw new NotFoundException(
        `This id ${productId} of product is not found`,
      );
    }
    return found;
  }
  // update a product
  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const { newName, newPrice, newDescription } = updateProductDto;

    const existingProduct = await this.getProductById(productId);
    existingProduct.name = newName ?? existingProduct.name;
    existingProduct.price = newPrice ?? existingProduct.price;
    existingProduct.description = newDescription ?? existingProduct.description;

    return existingProduct.save();
  }
  // delete product by id
  async deleteProductById(productId: string) {
    return this.productModel.deleteOne({ _id: productId });
  }
}
