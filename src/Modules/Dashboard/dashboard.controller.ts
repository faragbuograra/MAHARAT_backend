import { Request, Response, NextFunction } from 'express';
import { User } from '../Users/user.model';
import Service from '../Services/services.model';
import Message from '../Messages/messages.model';
import { Review } from '../Reviews/reviews.model';

export const DashboardController = {
  stats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [usersCount, providersCount, seekersCount, servicesCount, messagesCount, reviewsCount] = await Promise.all([
        User.query().resultSize(),
        User.query().where('role', 'provider').resultSize(),
        User.query().where('role', 'seeker').resultSize(),
        Service.query().resultSize(),
        Message.query().resultSize(),
        Review.query().resultSize(),
      ]);
      // Get latest 5 users
      const latestUsers = await User.query().orderBy('created_at', 'desc').limit(5);
      // Get top 5 providers by service count (fix GROUP BY error)
      const topProviders = await User.query()
        .where('role', 'provider')
        .select('users.id', 'users.name')
        .joinRelated('services')
        .count('services.id as serviceCount')
        .groupBy('users.id', 'users.name')
        .orderBy('serviceCount', 'desc')
        .limit(5);
      // Get latest 5 services
      const latestServices = await Service.query().orderBy('created_at', 'desc').limit(5);
      // Get latest 5 messages
      const latestMessages = await Message.query().orderBy('created_at', 'desc').limit(5);
      res.json({
        usersCount,
        providersCount,
        seekersCount,
        servicesCount,
        messagesCount,
        reviewsCount,
        latestUsers,
        topProviders,
        latestServices,
        latestMessages,
      });
    } catch (err) {
      next(err);
    }
  },
};
