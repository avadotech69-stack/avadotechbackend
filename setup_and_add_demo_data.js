const pool = require("./db");

async function setupAndAddDemoData() {
  try {
    console.log("🔧 Setting up database and adding demo data...\n");

    // 1. Create services table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Services table ready");

    // 2. Create works table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS works (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        link TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Works table ready");

    // 3. Check if demo data already exists
    const servicesCount = await pool.query("SELECT COUNT(*) FROM services");
    const worksCount = await pool.query("SELECT COUNT(*) FROM works");

    // 4. Add demo services if table is empty
    if (parseInt(servicesCount.rows[0].count) === 0) {
      console.log("\n📦 Adding demo services...");
      
      const demoServices = [
        {
          title: "Web Design & Development",
          description: "Professional, responsive websites that make your business stand out online",
          image_url: "/demos/wildroot.svg"
        },
        {
          title: "E-commerce Solutions",
          description: "Complete online stores with secure payment integration and inventory management",
          image_url: "/demos/forma-coffee.svg"
        },
        {
          title: "Digital Marketing",
          description: "Strategic campaigns across social media, Google Ads, and content marketing",
          image_url: "/demos/motion-studio.svg"
        },
        {
          title: "Mobile App Development",
          description: "Native and cross-platform mobile applications for iOS and Android",
          image_url: "/demos/luma-botanics.svg"
        },
        {
          title: "Brand Identity Design",
          description: "Complete branding packages including logo, colors, and brand guidelines",
          image_url: "/demos/field-and-form.svg"
        },
        {
          title: "SEO & Analytics",
          description: "Search engine optimization and data-driven insights for growth",
          image_url: "/demos/nivora-finance.svg"
        }
      ];

      for (const service of demoServices) {
        await pool.query(
          "INSERT INTO services (title, description, image_url) VALUES ($1, $2, $3)",
          [service.title, service.description, service.image_url]
        );
        console.log(`  ✓ Added: ${service.title}`);
      }
      console.log("✅ Demo services added successfully");
    } else {
      console.log(`\n✓ Services table already has ${servicesCount.rows[0].count} items`);
    }

    // 5. Add demo works if table is empty
    if (parseInt(worksCount.rows[0].count) === 0) {
      console.log("\n📦 Adding demo works...");
      
      const demoWorks = [
        {
          name: "Wildroot Living",
          description: "An elegant e-commerce platform for modern plant enthusiasts with seamless checkout experience",
          image_url: "/demos/wildroot.svg",
          link: ""
        },
        {
          name: "Forma Coffee Roasters",
          description: "A warm, editorial website for a neighborhood coffee roaster with online ordering",
          image_url: "/demos/forma-coffee.svg",
          link: ""
        },
        {
          name: "Motion Fitness Studio",
          description: "A vibrant community fitness platform with class booking and member management",
          image_url: "/demos/motion-studio.svg",
          link: ""
        },
        {
          name: "Luma Botanics",
          description: "A calming skincare brand website with beautiful product showcases and subscription service",
          image_url: "/demos/luma-botanics.svg",
          link: ""
        },
        {
          name: "Field & Form Interiors",
          description: "An understated portfolio website for a residential interior design practice",
          image_url: "/demos/field-and-form.svg",
          link: ""
        },
        {
          name: "Nivora Finance Dashboard",
          description: "A modern financial dashboard with real-time analytics and transaction management",
          image_url: "/demos/nivora-finance.svg",
          link: ""
        }
      ];

      for (const work of demoWorks) {
        await pool.query(
          "INSERT INTO works (name, description, image_url, link) VALUES ($1, $2, $3, $4)",
          [work.name, work.description, work.image_url, work.link]
        );
        console.log(`  ✓ Added: ${work.name}`);
      }
      console.log("✅ Demo works added successfully");
    } else {
      console.log(`\n✓ Works table already has ${worksCount.rows[0].count} items`);
    }

    console.log("\n🎉 Setup complete! You can now use the admin panel.");
    console.log("\n📊 Summary:");
    const finalServices = await pool.query("SELECT COUNT(*) FROM services");
    const finalWorks = await pool.query("SELECT COUNT(*) FROM works");
    console.log(`   Services: ${finalServices.rows[0].count} items`);
    console.log(`   Works: ${finalWorks.rows[0].count} items`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

setupAndAddDemoData();
