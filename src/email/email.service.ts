import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_USER,
        pass: envs.MAILER_TOKEN,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({ to, subject, html });
  }
}