import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { PaymentSessiontDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class PaymentsService {
  

  constructor(

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    
    
    private readonly dataSource: DataSource,
  ){}

  private readonly stripe = new Stripe(process.env.STRIPE_SECRET);

  async createPaymentSession(paymenSessionDto: PaymentSessiontDto){
    const {currency, items} = paymenSessionDto;

    const lineItems = items.map(item => {

      return {
        price_data:{
          currency: currency,
          product_data:{
            name: item.name
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      };

    });


    const session = await this.stripe.checkout.sessions.create({
      
      payment_intent_data: {
        metadata:{}
      },

      line_items:lineItems,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',

    });

    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    }
  }

  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    // Real
    const endpointSecret = process.env.stripeEndpointSecret;

    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log('aqui llega');
    switch( event.type ) {
      case 'charge.succeeded': 
        const chargeSucceeded = event.data.object;

        
        
        
        console.log({
          metadata: chargeSucceeded.metadata,
          orderId: chargeSucceeded.metadata.orderId,
        });
      break;
      
      default:
        console.log(`Event ${ event.type } not handled`);
    }

    return res.status(200).json({ sig });
  }
}