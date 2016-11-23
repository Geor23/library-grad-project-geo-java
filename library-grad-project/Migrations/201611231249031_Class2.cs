namespace LibraryGradProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Class2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Books", "PublishDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Books", "PublishDate", c => c.String());
        }
    }
}
