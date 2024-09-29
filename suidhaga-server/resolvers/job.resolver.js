import Job from "../models/job.model.js";
import OrderModel from "../models/order.model.js";


const jobResolver = {
  Mutation: {
    createJob: async (_, { input }, context) => {
      const user = await context.getUser();
      const {
        title,
        description,
        amount,
        size,
        color,
        quantity,
        createdAt,
        image,
      } = input;
      try {
        if (!title || !description || !createdAt) {
          throw new Error(`All fields are required`);
        }
        if (user) {
          const newJob = new Job({
            title,
            description,
            createdAt,
            amount,
            size,
            color,
            quantity,
            image,
            user: user.id,
            username: user.username,
            name: user.name,
            status: "Active",
          });
          console.log(newJob);
          await newJob.save();
          return newJob;
        }
        if (!user) {
          throw new Error(`User Not Found`);
        }
      } catch (error) {
        console.log(error);
        throw new Error(err.message || "Internal server error");
      }
    },
    deleteJob: async (_, { jobId }, context) => {
      // const user = context.getUser();
      // console.log(user.username);
      try {
        const job = await Job.findById(jobId);
        console.log(job);
        // console.log(post.username);
        await job.deleteOne();
        if (job) {
          return {
            success: true,
            message: "Job deleted successfully",
          };
        } else {
          return {
            success: false,
            message: "Job not found",
          };
        }
      } catch (error) {
        console.log(error.message);
        throw new Error(error);
      }
    },
    updateJobStatus: async (_, { jobId, status }, context) => {
      try {
        //   const updatedJob = await Job.findOneAndUpdate(
        //     { _id: jobId },
        //     { $set: { status } },
        //     { returnOriginal: false }
        //   );

        //   if (!updatedJob.value) {
        //     throw new Error('Job not found');
        //   }

        //   return updatedJob.value;
        const job = await Job.findById(jobId);
        if (!job) {
          throw new Error("Job not found");
        }

        job.status = status;
        await job.save();
        return job;
      } catch (error) {
        throw new Error("Error updating job status");
      }
    },
    applyJob: async (_,{ jobId }, context) => {
      try {
        
        const user = await context.getUser();
        const job = await Job.findById(jobId);
        if (!job) {
          throw new Error("Job not found");
        }
        const application = {
          userId: user._id,
          createdAt: new Date().toISOString(),
          username: user.name, 
        };
        
        job.applications.push(application);
        await job.save();

        const userApplication = {
          id: job._id,
          createdAt: new Date().toISOString(),
        };
        // console.log(userApplication);
        user.applications.push(userApplication);
        await user.save();
        
        // try {
        //   const NewOrder = new OrderModel({
        //     jobID : jobId,
        //     // applications : application,
        //   }); 
        //   console.log("NewOder:",NewOrder);
        //   await NewOrder.save();
        //   return NewOrder;
        // } catch (error) {
        //   console.log("error : ",error);
        // }
        return job;
      } catch (error) {
        throw new Error("Failed to apply job");
      }
    },
  },

  Query: {
    jobs: async () => {
      try {
        const jobs = await Job.find();
        return jobs;
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },
    job: async (_, { id }) => {
      console.log(`fetching jobs by id`);
      try {
        console.log(`fetching job by id`);
        console.log(id);
        const job = await Job.findById(id);
        if (!job) {
          throw new Error("Job not found");
        }
        return job;
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },
    jobByUserID: async (_, { id }) => {
      console.log(id);
      try {
        const jobs = await Job.find({ user: id });
        return jobs;
      } catch (error) {
        console.log(error);
        throw new Error("Unable to fetch jobs. Please try again later.");
      }
    },
  },
};

export default jobResolver;
